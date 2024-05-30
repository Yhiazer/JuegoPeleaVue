<template>
    <div class="estadio-container" ref="stadium">
        <Character1 id="player1" ref="play1" @send-data="danyo1" />
        <Character2 id="player2" ref="play2" @send-data="danyo2" />
    </div>
</template>

<script>
import Character1 from '@/components/Character.vue'
import Character2 from '@/components/Character.vue'

export default {
    name: 'Stadium',
    components: {
        Character1,
        Character2
    },
    data() {
        return {
            posX: 0,
            posY: 0,
            posX2: 0,
            posY2: 0,
            velocidad: 10,
            teclasPresionadas: {},
            contenedorAncho: 0,
            contenedorAlto: 0,
            danyoPers1: 0,
            danyoPers2: 0,
        };
    },
    mounted() {
        this.objeto = document.getElementById('player1');
        this.objeto2 = document.getElementById('player2');
        this.actualizarDimensionesContenedor();

        window.addEventListener('keydown', this.manejarTeclaPresionada);
        window.addEventListener('keyup', this.manejarTeclaLiberada);

        this.intervalo = setInterval(() => {
            this.manejarMovimiento();
            this.moverObjeto();
            this.verificarPosicion();
        }, 10);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.manejarTeclaPresionada);
        window.removeEventListener('keyup', this.manejarTeclaLiberada);
        clearInterval(this.intervalo);
    },
    methods: {
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
                if (!this.moviendoseP1 && this.$refs.play1.actionPoints >= this.actionCost) {
                    this.tepiarseP1();
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
                if (!this.moviendoseP2 && this.$refs.play2.actionPoints >= this.actionCost) {
                    this.tepiarseP2();
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
                const player1Health = this.$refs.play1.health;
                const player2Health = this.$refs.play2.health;
                console.log("Health updated:", { player1Health, player2Health });
                this.$emit('health-updated', { player1Health, player2Health });
            }
        },
        reposicionar() {
            this.posX = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.posX2 = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY2 = Math.floor(Math.random() * (this.contenedorAlto - 100));
        },
        tepiarseP1() {
            this.posX = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.moviendoseP1 = true;
            setTimeout(() => {
                this.moviendoseP1 = false;
            }, 2000);
        },
        tepiarseP2() {
            this.posX2 = Math.floor(Math.random() * (this.contenedorAncho - 100));
            this.posY2 = Math.floor(Math.random() * (this.contenedorAlto - 100));
            this.moviendoseP2 = true;
            setTimeout(() => {
                this.moviendoseP2 = false;
            }, 2000);
        },
        actualizarDimensionesContenedor() {
            this.contenedorAncho = this.$refs.stadium.clientWidth;
            this.contenedorAlto = this.$refs.stadium.clientHeight;
        },
        danyo1(data) {
            this.danyoPers1 = data;
        },
        danyo2(data) {
            this.danyoPers2 = data;
        }
    },
}
</script>

<style>
.estadio-container {
    position: relative;
    width: 1300px;
    height: 650px;
    /* Altura fija de 90vh */
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