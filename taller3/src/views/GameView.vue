<template>
    <div class="estadio">
        <!-- Aquí pasamos los datos recibidos como props al componente Stadium -->
        <Stadium />
    </div>
</template>

<script>
import Stadium from '@/components/Stadium.vue'

export default {
    components: {
        Stadium
    },
    props: {
        selectedImages: {
            type: Array,
            required: true
        }
    },
    mounted() {
        console.log('selectedImages:', this.selectedImages);
    }
}
</script>


<style>
.estadio{
    min-width: 100vh;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
}
</style>
