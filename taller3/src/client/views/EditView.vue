<template>
    <NavBar />
    <div class="wrapper">
      <div class="contenedor">
        <div class="imagen-perfil">
          <h2>Imagen de Perfil</h2>
          <div class="drop-zone" :class="{ 'drop-zone-dragging': dragging }" @dragover.prevent="handleDragOver"
            @dragenter="handleDragEnter" @dragleave="handleDragLeave" @drop="handleDrop">
            <div v-if="!image" :class="{ 'placeholder': !dragging, 'placeholder-highlight': dragging}">
              {{ dragging ? 'Suelta Aquí' : 'Arrastra y suelta la imagen de perfil' }}
            </div>
            <img v-else :src="image" class="uploaded-image" />
          </div>
        </div>
        <div class="editar">
          <h3>👤 Usuario :</h3>
          <input type="text" v-model="usuario" placeholder="Ingrese su usuario">
          <h3>📧 Correo :</h3>
          <input type="email" v-model="correo" placeholder="Ingrese su correo electrónico">
          <h3>🔒 Contraseña :</h3>
          <input type="password" v-model="contrasena" placeholder="Ingrese su contraseña">
        </div>
      </div>
    </div>
  
    <div class="botones" style="padding-top: 50px;">
      <button class="volver" @click="goToPerfil">Volver Atrás</button>
      <button class="crear" @click="goToPerfil">Guardar Cambios</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import NavBar from '@/client/components/NavBar.vue';
  
  export default {
    components: {
      NavBar
    },
    setup() {
      const image = ref(null);
      const dragging = ref(false);
      const usuario = ref('');
      const correo = ref('');
      const contrasena = ref('');
  
      const handleDragOver = (event) => {
        event.preventDefault();
      };
  
      const handleDragEnter = () => {
        dragging.value = true;
      };
  
      const handleDragLeave = () => {
        dragging.value = false;
      };
  
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            image.value = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
  
      return {
        image,
        dragging,
        usuario,
        correo,
        contrasena,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDrop
      };
    },
    methods: {
      goToPerfil() {
        this.$router.push({ name: 'perfil' });
      }
    }
  };
  </script>
  
  <style>
  body,
  html {
    height: 100%;
    margin: 0;
  }
  
  .wrapper {
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .contenedor {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(127, 131, 135);
    padding: 20px;
    width: 1300px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .imagen-perfil {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .drop-zone {
    width: 300px;
    height: 300px;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .drop-zone-dragging {
    border-color: black;
  }
  
  .uploaded-image {
    max-width: 300px;
    max-height: 300px;
  }
  
  .editar {
    background-color: rgb(81, 81, 81);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .editar h3 {
    margin: 10px 0;
  }
  
  .editar input {
    padding: 8px;
    width: 80%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .botones {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .volver {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .volver {
    background-color: rgb(70, 146, 217);
  }
  
  .volver:hover {
    background-color: rgb(127, 187, 244);
  }
  </style>