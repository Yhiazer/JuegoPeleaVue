<template>
    <div>
        <NavBar />
        <div class="gameover-container">
            <p>El ganador es: {{ $route.query.winner }}</p>
            <p>Tiempo de combate: {{ $route.query.combatTime }} segundos</p>
        </div>
        <div class="container" style="padding: 25px;">
            Mejor record
            <p>Ganador: {{ mejorRecord.jugador }}</p>
            <p>Tiempo de combate: {{ mejorRecord.tiempo }} segundos</p>
        </div>
        <section style="padding: 25px;">
            <h3 style="padding: 20px;">¿Jugar Otra Vez?</h3>
            <button @click="goToSeleccion">Jugar</button>
        </section>
    </div>
</template>

<script>
import NavBar from '@/client/components/NavBar.vue'

export default {
    components: {
        NavBar
    },
    data() {
        return {
            mejorRecord: {
                jugador: '',
                tiempo: null
            }
        };
    },
    mounted() {
        // Hacer la solicitud GET al servidor para obtener el mejor récord
        fetch('/menorTiempoDeCombate')
            .then(response => response.json())
            .then(data => {
                // Actualizar los datos del mejor récord en el componente Vue
                this.mejorRecord.jugador = data.jugadorMenorTiempo;
                this.mejorRecord.tiempo = data.menorTiempo;
            })
            .catch(error => {
                console.error('Error al obtener el mejor récord:', error);
            });
    },
    methods: {
        goToSeleccion() {
            this.$router.push({ name: 'seleccion' });
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
