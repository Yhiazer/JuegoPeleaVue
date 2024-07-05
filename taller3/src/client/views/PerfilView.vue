<template>
    <NavBar />
    <div class="wrapper">
        <div class="contenedor">
            <div class="imagen-perfil">
                <div class="drop-zone" :class="{ 'drop-zone-dragging': dragging }" @dragover.prevent="handleDragOver"
                    @dragenter="handleDragEnter" @dragleave="handleDragLeave" @drop="handleDrop">
                    <div v-if="!image"
                        :class="{ 'placeholder-highlight': !dragging, 'placeholder-highlight': dragging }">
                        {{ dragging ? 'Suelta Aquí' : 'Arrastra y suelta la imagen de perfil' }}
                    </div>
                    <img v-else :src="image" class="uploaded-image" />
                </div>
                <h2>Imagen de Perfil <span @click="goToEdit" style="cursor: pointer;">📝</span></h2>
            </div>
            <div class="info">
                <h3>👤 Usuario : [Username] <span @click="goToEdit" style="cursor: pointer;">📝</span></h3>
                <h3>📧 Correo : [Correo de Usuario] <span @click="goToEdit" style="cursor: pointer;">📝</span></h3>
                <h3>⏳ Mejor Tiempo en Combate : [Record]</h3>
            </div>
        </div>
    </div>
    <div class="botones" style="padding-top: 50px;">
        <button class="cerrar">Cerrar Sesión</button>
        <button class="eliminar">Eliminar Sesión</button>
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
            handleDragOver,
            handleDragEnter,
            handleDragLeave,
            handleDrop
        };
    },
    methods: {
        goToEdit() {
            this.$router.push({ name: 'edit' });
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

.info {
    background-color: rgb(81, 81, 81);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
}

.botones {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.cerrar,
.eliminar {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cerrar {
    background-color: rgb(199, 171, 70);
}

.cerrar:hover {
    background-color: rgb(239, 208, 96);
}

.eliminar {
    background-color: rgb(122, 25, 25);
}

.eliminar:hover {
    background-color: rgb(224, 49, 49);
}
</style>