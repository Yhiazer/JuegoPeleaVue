import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración necesaria para obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar la autenticación de usuarios
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Leer el archivo de usuarios
  const filePath = path.join(__dirname, 'emails.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }

    const users = data.split('\n').map(line => {
      const [userEmail, username, userPassword] = line.split(',');
      return { email: userEmail.trim(), username: username.trim(), password: userPassword.trim() };
    });

    const user = users.find(user => user.email === email);

    if (user) {
      if (user.password === password) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', username: user.username });
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ message: 'Email no encontrado' });
    }
  });
});

//ruta para guardar los records
app.post('/guardarDatos', (req, res) => {
    const { winner, combatTime } = req.body;
    const data = `Ganador: ${winner}, Tiempo de combate: ${combatTime}`;
    const filePath = path.join(__dirname, 'records.txt');

    fs.appendFile(filePath, data + '\n', (err) => {
        if (err) {
            console.error('Error al guardar datos:', err);
            res.status(500).send('Error al guardar datos');
        } else {
            console.log('Datos guardados correctamente.');
            res.send('Datos guardados correctamente.');
        }
    });
});

app.get('/menorTiempoDeCombate', (req, res) => {
    const filePath = path.join(__dirname, 'records.txt');

    try {
        // Leer el contenido del archivo
        const data = fs.readFileSync(filePath, 'utf-8');

        // Dividir el contenido en líneas
        const lines = data.split('\n');

        let menorTiempo = Infinity;
        let jugadorMenorTiempo = '';

        // Iterar sobre cada línea
        lines.forEach(line => {
            // Extraer el tiempo de combate y el jugador de cada línea
            const match = line.match(/Tiempo de combate: (\d+)/);
            if (match && match[1]) {
                const tiempo = parseInt(match[1], 10);
                if (tiempo < menorTiempo) {
                    menorTiempo = tiempo;
                    jugadorMenorTiempo = line.match(/Ganador: (.+),/)[1];
                }
            }
        });

        res.json({ menorTiempo, jugadorMenorTiempo });
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        res.status(500).json({ error: 'Error al obtener el menor tiempo de combate' });
    }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

