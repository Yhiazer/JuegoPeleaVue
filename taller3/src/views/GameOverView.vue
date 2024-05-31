<template>
    <div>
        <NavBar />
        <div class="gameover-container">
            <p>El ganador es: {{ $route.query.winner }}</p>
            <p>Tiempo de combate: {{ $route.query.combatTime }} segundos</p>
        </div>
        <section style="padding: 25px;">
            <h3 style="padding: 20px;">¿Jugar Otra Vez?</h3>
            <button @click="goToGame">Jugar</button>
        </section>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    components: {
        NavBar
    },
    methods: {
        goToGame() {
            this.$router.push({ name: 'game' });
        }
    },
    props: {
        winner: {
            type: String,
            required: true
        },
        combatTime: {
            type: Number,
            required: true
        }
    },
    computed: {
        winner() {
            return this.$route.query.winner;
        },
        combatTime() {
            return this.$route.query.combatTime;
        }
    }
}
</script>

<style>
.gameover-container {
    padding-top: 200px;
    text-align: center;
}

.gameover-container p {
    font-size: 2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
