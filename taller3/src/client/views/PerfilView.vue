<template>
    <NavBar />
    <div class="imagen">

    </div>
    <div class="info">
        <h1>Nombre De Usario</h1>
        <h2>Correo</h2>
        <h2>Mejor Tiempo en Combate</h2>
    </div>
    <div class="record">

    </div>
    <div class="botones">
        <button class="cerrar">Cerrar Sesión</button>
        <button class="eliminar">Eliminar Sesión</button>
    </div>

</template>

<script>
import NavBar from '@/client/components/NavBar.vue'
export default {
    components: {
        NavBar
    }
}
</script>

<style>
.info {
    padding-top: 100px;
    background-color: rgb(81, 81, 81);
    box-sizing: border-box;
}

.cerrar {
    background-color: brown;
}

.cerrar:hover {
    background-color: rgb(234, 87, 87);
}

.eliminar {
    background-color: brown;
}

.eliminar:hover {
    background-color: rgb(234, 87, 87);
}
</style>