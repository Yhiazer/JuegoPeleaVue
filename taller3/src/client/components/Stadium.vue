<template>
    <div class="estadio-container" ref="stadium">
        <Character1 :imageUrl="images[0]" id="player1" ref="play1" @send-data="danyo1" />
        <Character2 :imageUrl="images[1]" id="player2" ref="play2" @send-data="danyo2" />
        <audio ref="backgroundMusic" loop :volume="0.1">
            <source src="../media/Music/Pelea.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio ref="tepAudio" volume="0.1">
            <source src="../media/Music/Tp1.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio ref="tep2Audio" volume="0.1">
            <source src="../media/Music/Tp2.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio ref="dmgAudio" volume="0.1">
            <source src="../media/Music/Dmg.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script>
import Character1 from '@/client/components/Character.vue'
import Character2 from '@/client/components/Character.vue'

export default {
    name: 'Stadium',
    components: {
        Character1,
        Character2
    },
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            posX: 50,
            posY: 250,
            posX2: 1100,
            posY2: 250,
            velocidad: 10,
            teclasPresionadas: {},
            contenedorAncho: 0,
            contenedorAlto: 0,
            danyoPers1: 0,
            danyoPers2: 0,
            time: 0,
            timerInterval: null,
            musicVolume: 0.5
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.objeto = this.$refs.play1.$el;
            this.objeto2 = this.$refs.play2.$el;
            this.playBackgroundMusic();
            window.addEventListener('keydown', this.manejarTeclaPresionada);
            this.actualizarDimensionesContenedor();

            window.addEventListener('keydown', this.manejarTeclaPresionada);
            window.addEventListener('keyup', this.manejarTeclaLiberada);

            this.movimientoInterval = setInterval(() => {
                this.manejarMovimiento();
                this.moverObjeto();
                this.verificarPosicion();
            }, 10);

            this.danyoInterval = setInterval(() => {
                this.danyoPers1 = this.subirDanyo(this.danyoPers1);
                this.danyoPers2 = this.subirDanyo(this.danyoPers2);
            }, 5000);

            this.startTimer();
        });
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.manejarTeclaPresionada);
        window.removeEventListener('keyup', this.manejarTeclaLiberada);
        this.pauseBackgroundMusic();
        clearInterval(this.movimientoInterval);
        clearInterval(this.danyoInterval);
        this.stopTimer();
    },
    methods: {
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.time++;
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timerInterval);
        },
        playBackgroundMusic() {
            this.$refs.backgroundMusic.play();
        },
        pauseBackgroundMusic() {
            this.$refs.backgroundMusic.pause();
        },
        setMusicVolume() {
            this.$refs.backgroundMusic.volume = volume;
        },
        manejarTeclaPresionada(event) {
            this.teclasPresionadas[event.key] = true;
        },
        manejarTeclaLiberada(event) {
            this.teclasPresionadas[event.key] = false;
        },
        manejarMovimiento() {
            if (this.teclasPresionadas['w'] && this.posY > 0) {
                this.posY -= this.velocidad;
            }
            if (this.teclasPresionadas['a'] && this.posX > 0) {
                this.posX -= this.velocidad;
            }
            if (this.teclasPresionadas['s'] && this.posY < this.contenedorAlto - this.objeto.offsetHeight) {
                this.posY += this.velocidad;
            }
            if (this.teclasPresionadas['d'] && this.posX < this.contenedorAncho - this.objeto.offsetWidth) {
                this.posX += this.velocidad;
            }
            if (this.teclasPresionadas['c']) {
                if (!this.moviendoseP1) {
                    this.tpP1();
                }
            }
            if (this.teclasPresionadas['ArrowUp'] && this.posY2 > 0) {
                this.posY2 -= this.velocidad;
            }
            if (this.teclasPresionadas['ArrowLeft'] && this.posX2 > 0) {
                this.posX2 -= this.velocidad;
            }
            if (this.teclasPresionadas['ArrowDown'] && this.posY2 < this.contenedorAlto - this.objeto2.offsetHeight) {
                this.posY2 += this.velocidad;
            }
            if (this.teclasPresionadas['ArrowRight'] && this.posX2 < this.contenedorAncho - this.objeto2.offsetWidth) {
                this.posX2 += this.velocidad;
            }
            if (this.teclasPresionadas['0']) {
                if (!this.moviendoseP2) {
                    this.tpP2();
                }
            }
        },
        moverObjeto() {
            this.objeto.style.left = this.posX + 'px';
            this.objeto.style.top = this.posY + 'px';
            this.objeto2.style.left = this.posX2 + 'px';
            this.objeto2.style.top = this.posY2 + 'px';
        },
        verificarPosicion() {
            const distanciaX = Math.abs(this.posX - this.posX2);
            const distanciaY = Math.abs(this.posY - this.posY2);

            if (distanciaX <= 60 && distanciaY <= 55) {
                this.$refs.play1.attack_manual(this.danyoPers2, '1');
                this.$refs.play2.attack_manual(this.danyoPers1, '2');
                this.reposicionar();
                this.checkGameOver();
                const player1Health = this.$refs.play1.health;
                const player2Health = this.$refs.play2.health;
                console.log("Health updated:", { player1Health, player2Health });
                this.$emit('health-updated', { player1Health, player2Health });
                this.reproducirAudioDmg();
            }
        },
        reposicionar() {
            this.posX = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.posX2 = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY2 = Math.floor(Math.random() * (this.contenedorAlto - 100));
        },
        tpP1() {
            this.reproducirAudioTp1();
            this.posX = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.moviendoseP1 = true;
            this.$refs.play1.efectoTp();
            setTimeout(() => {
                this.moviendoseP1 = false;
            }, 100);
        },
        tpP2() {
            this.reproducirAudioTp2();
            this.posX2 = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY2 = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.moviendoseP2 = true;
            this.$refs.play2.efectoTp();
            setTimeout(() => {
                this.moviendoseP2 = false;
            }, 100);
        },
        reproducirAudioTp1() {
            this.$refs.tepAudio.play();
        },
        reproducirAudioTp2() {
            this.$refs.tep2Audio.play();
        },
        reproducirAudioDmg() {
            this.$refs.dmgAudio.play();
        },
        actualizarDimensionesContenedor() {
            this.contenedorAncho = this.$refs.stadium.clientWidth;
            this.contenedorAlto = this.$refs.stadium.clientHeight;
        },
        subirDanyo(danyo) {
            var x = Math.floor(Math.random() * 10 + 1);
            danyo += x;
            console.log("El daño aumentó en " + x);
            return danyo;
        },
        danyo1(data) {
            this.danyoPers1 = data;
        },
        danyo2(data) {
            this.danyoPers2 = data;
        },
        checkGameOver() {
            const player1Health = this.$refs.play1.health;
            const player2Health = this.$refs.play2.health;
            if (player1Health <= 0 || player2Health <= 0) {
                this.stopTimer();
                const username = localStorage.getItem('username');
                const winner = player1Health <= 0 ? 'Jugador 2' : username;
                const combatTime = this.time;

                setTimeout(() => {
                    this.$router.push({
                        name: 'gameover',
                        query: { winner, combatTime }
                    });
                }, 3000);
            }
        }

    }
}
</script>

<style>
.estadio-container {
    margin-top: 100px;
    position: relative;
    width: 1200px;
    height: 550px;
    background-image: url("../media/estadio.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

#player1,
#player2 {
    position: absolute;
}
</style>
