<template>
    <div>
        <NavBar />
        <div class="gameover-container">
            <p>El ganador es: {{ winner }}</p>
            <p>Tiempo de combate: {{ combatTime }} segundos</p>
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
import NavBar from '@/client/components/NavBar.vue';
import axios from 'axios';

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
        this.menorRecord();
    },
    methods: {
        async menorRecord() {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.post('http://localhost:3000/api/register-record', {
                    username: this.winner,
                    user: username,
                    tiempo_minimo: this.combatTime
                });

                console.log('Respuesta del servidor:', response.data);

                const resp = await axios.get('http://localhost:3000/api/record', {
                    params: {
                        username: username
                    }
                });

                console.log(resp.data.record[0]);
                this.mejorRecord = {
                    jugador: resp.data.record[0].username,
                    tiempo: resp.data.record[0].tiempo_minimo
                }

            } catch (error) {
                console.error('Error al registrar:', error);
                // Manejar el error, como mostrar un mensaje de error al usuario
            }
        },
        goToSeleccion() {
            this.$router.push({ name: 'seleccion' });
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
