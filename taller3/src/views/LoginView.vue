<template>
  <NavBar />
  <div class="limiter">
    <div class="container-login">
      <div class="login">
        <form class="login-form" @submit.prevent="checkEmail">
          <span class="titulo">
            Inicio de Sesión
          </span>
          <div class="container-input">
            <input class="input" type="text" v-model="email" placeholder="Email">
          </div>
          <div class="container-input">
            <input class="input" type="password" v-model="password" placeholder="Contraseña">
          </div>
          <div class="container-boton">
            <button class="boton">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useUserDataStore } from '@/stores/username';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      email: '',
      password: '',
      users: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('/emails.txt');
        const data = await response.text();
        this.users = data.split('\n').map(line => {
          const [email, username, password] = line.split(',');
          return { email: email.trim(), username: username.trim(), password: password.trim() };
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    checkEmail() {
      const user = this.users.find(user => user.email === this.email.trim());
      if (user) {
        if (user.password === this.password.trim()) {
          useUserDataStore().setUsername(user.username);
          this.$router.push({ name: 'seleccion' });
        } else {
          alert('Contraseña incorrecta.');
        }
      } else {
        alert('Email no encontrado.');
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
  border: none;
}

button {
  border: none;
}

button:hover {
  cursor: pointer;
}

.container-login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.login {
  width: 50%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.login-form {
  width: 100%;
}

.titulo {
  margin: 30px;
  display: block;
  font-size: 30px;
  color: #555;
  line-height: 1.2;
  text-align: center;
}

.container-input {
  padding: 10px;
  width: 100%;
  position: relative;
  background-color: #fff;
}

.input {
  display: block;
  border: 1px solid #d6d6d6;
  width: 100%;
  background: 0 0;
  font-size: 15px;
  color: #666;
  line-height: 1.2;
}

input.input {
  height: 68px;
  padding: 0 25px;
}

.container-boton {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.boton {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: rgb(61, 176, 88);
  font-size: 14px;
  color: #fff;
  line-height: 1.2;
  transition: all 0.4s;
}

.boton:hover {
  background-color: rgb(103, 206, 127);
}
</style>