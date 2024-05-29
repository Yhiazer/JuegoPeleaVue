<template>
    <div class="estadio">
        <Stadium />
    </div>
</template>

<script>
import Stadium from '@/components/Stadium.vue'

export default {
    components: {
        Stadium
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