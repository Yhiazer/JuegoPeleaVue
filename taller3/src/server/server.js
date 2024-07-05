import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import cors from 'cors';
import bodyParser from 'body-parser';

const { Pool } = pkg;

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'JuegoPelea',
  password: 'root',
  port: 5432,
});

//para trabajar con Json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5173' // Reemplaza con la URL de tu frontend
}));


app.get('/api/userinfo', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Falta el nombre de usuario' });
  }

  try {
    const result = await pool.query('SELECT username, correo, imagen FROM usuario WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    res.status(200).json({ username: user.username, correo: user.correo, imagen: user.imagen });
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, correo, password } = req.body;

  let query = 'SELECT * FROM usuario WHERE';
  const params = [];

  // Comprobar si se está usando username o correo
  if (username) {
    params.push(username);
    query += ` username = $${params.length}`;
  } else if (correo) {
    params.push(correo);
    query += ` correo = $${params.length}`;
  } else {
    return res.status(400).json({ message: 'Correo o username incorrectos' });
  }

  try {
    const result = await pool.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.contrasenia);
    if (match) {
      res.status(200).json({ message: 'Inicio de sesión exitoso', username: user.username });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, correo, password, imagen} = req.body;

  console.log(req.body);

  // Validar que se proporcionen los campos necesarios
  if (!username || !correo || !password || !imagen) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuario (username, correo, contrasenia, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, correo, hashedPassword, imagen]
    );

    // Enviar respuesta con el nuevo usuario
    const newUser = result.rows[0];
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

app.delete('/api/users/delete', async (req, res) => {
  const { username } = req.query;

  try {
    // Eliminar registros asociados al usuario
    await deleteUserRecords(username);

    // Eliminar el usuario
    const result = await pool.query('DELETE FROM usuario WHERE username = $1 RETURNING *', [username]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario y sus registros eliminados exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario y/o sus registros:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario y/o sus registros' });
  }
});


app.put('/api/users/edit', async (req, res) => {
  const { username, correo, user, imagen } = req.body;

  console.log(user);

  // Validar que se proporcionen los campos necesarios
  if (!username || !correo || !imagen) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Actualizar el usuario en la base de datos
    console.log(user);
    const result = await pool.query(
      'UPDATE usuario SET username = $1, correo = $2, imagen = $4 WHERE username = $3 RETURNING *',
      [username, correo, user, imagen]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const updatedUser = result.rows[0];
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});



app.get('/api/record', async (req, res) => {
  const { username } = req.query;

  try {
    const result = await pool.query('SELECT * FROM record WHERE usuario_user = $1', [username]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const resultado = result.rows;
    res.status(200).json({ message: 'Usuario encontrado', record: resultado });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

app.post('/api/register-record', async (req, res) => {
  const { username, user, tiempo_minimo } = req.body;

  console.log(req.body + " username " + user + " tiempo: " + tiempo_minimo);

  // Validar que se proporcionen los campos necesarios
  if (!username || !tiempo_minimo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si ya existe un registro para el usuario
    const existingRecord = await pool.query(
      'SELECT * FROM record WHERE usuario_user = $1',
      [user]
    );

    if (existingRecord.rows.length > 0) {
      // Si existe un registro, comparar el tiempo mínimo
      console.log(existingRecord.rows[0]);
      const currentRecord = existingRecord.rows[0];
      const currentTiempoMinimo = currentRecord.tiempo_minimo;

      if (tiempo_minimo < currentTiempoMinimo) {
        // Si el nuevo tiempo es menor, actualizar el registro existente
        const updatedRecord = await pool.query(
          'UPDATE record SET tiempo_minimo = $1, username = $3 WHERE usuario_user = $2 RETURNING *',
          [tiempo_minimo, user, username]
        );
        const updatedRecordData = updatedRecord.rows[0];
        return res.status(200).json({ message: 'Registro actualizado exitosamente', record: updatedRecordData });
      } else {
        // Si el nuevo tiempo no es menor, no hacer nada y retornar el registro existente
        return res.status(200).json({ message: 'El tiempo mínimo no es menor que el registro existente', record: currentRecord });
      }
    } else {
      // Si no existe un registro, insertar el nuevo registro en la base de datos
      const result = await pool.query(
        'INSERT INTO record (tiempo_minimo, usuario_user, username) VALUES ($1, $2, $3) RETURNING *',
        [tiempo_minimo, user, username]
      );

      // Enviar respuesta con el nuevo registro
      const newRecord = result.rows[0];
      return res.status(201).json({ message: 'Registro creado exitosamente', record: newRecord });
    }
  } catch (error) {
    console.error('Error al crear o actualizar el registro:', error);
    return res.status(500).json({ error: 'Error al crear o actualizar el registro' });
  }
});

// Función para eliminar registros asociados a un usuario
async function deleteUserRecords(username) {
  try {
    await pool.query('DELETE FROM record WHERE usuario_user = $1', [username]);
  } catch (error) {
    console.error('Error al eliminar los registros del usuario:', error);
    throw new Error('Error al eliminar los registros del usuario');
  }
}


app.listen(port, () => {
  console.log('server funcando');
})