<template>
    <div class="navbar"><Stats :player1Health="player1Health" :player1MaxHealth="player1MaxHealth" :player2Health="player2Health" :player2MaxHealth="player2MaxHealth" /></div>
    <div class="estadio">
        <Stadium />
    </div>
</template>

<script>
import Stadium from '@/components/Stadium.vue'
import Stats from '@/components/Stats.vue'
export default {
    components: {
        Stadium,
        Stats
    },
    data() {
        return {
            player1Health: 50,
            player1MaxHealth: 100, 
            player2Health: 100,
            player2MaxHealth: 100, 
        }
    }
}
</script>

<style>
.navbar{
    position: fixed;
    z-index: 10;
}
.estadio {
    min-width: 100vh;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 15px;
    z-index: 1;
}
</style>