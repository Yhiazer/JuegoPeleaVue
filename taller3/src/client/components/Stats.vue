<template>
    <header class="player-header">
        <div class="container">
            <div class="player-container">
                <div>
                    <div v-if="player1Health > 0.5">
                        <img :src="images[0]" height="80px" alt="p1-idle.png">
                    </div>
                    <div v-else>
                        <img src="@/client/media/Misc/tumba.png" height="80px" alt="p1-dead.png">
                    </div>
                </div>
                <div class="barras">
                    <p>Player 1: {{ username }}</p>
                    <div class="barra-hp">
                        <div class="relleno-hp" :style="{ width: player1HealthPercentage }"></div>
                    </div>
                </div>
            </div>
            <div class="events">
                <p >{{ time }}</p>
                <div class="attackup-container">
                    <transition name="fade">
                        <img v-if="showAttackUp" src="@/client/media/Misc/attackup.png" width="150px" style="z-index: 10;" alt="attackup.png">
                    </transition>
                </div>
            </div>
            <div class="player-container">
                <div>
                    <div v-if="player2Health > 0.5">
                        <img :src="images[1]" height="80px" alt="p2-idle.png">
                    </div>
                    <div v-else>
                        <img src="@/client/media/Misc/tumba.png" height="80px" alt="p2-dead.png">
                    </div>
                </div>
                <div class="barras">
                    <p>Player 2 : Invitado</p>
                    <div class="barra-hp">
                        <div class="relleno-hp" :style="{ width: player2HealthPercentage }"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    props: {
        username: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        player1Health: {
            type: Number,
            required: true
        },
        player1MaxHealth: {
            type: Number,
            required: true
        },
        player2Health: {
            type: Number,
            required: true
        },
        player2MaxHealth: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            time: 0,
            interval: null,
            showAttackUp: false,
            attackUpInterval: null
        };
    },
    computed: {
        player1HealthPercentage() {
            return `${(this.player1Health / this.player1MaxHealth) * 100}%`;
        },
        player2HealthPercentage() {
            return `${(this.player2Health / this.player2MaxHealth) * 100}%`;
        }
    },
    watch: {
        player1Health(newVal) {
            if (newVal <= 0) {
                this.stopTimer();
            }
        },
        player2Health(newVal) {
            if (newVal <= 0) {
                this.stopTimer();
            }
        }
    },
    mounted() {
        this.startTimer();
        this.startAttackUpTimer();
    },
    methods: {
        startTimer() {
            this.interval = setInterval(() => {
                this.time++;
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.interval);
            this.interval = null;
            clearInterval(this.attackUpInterval);
            this.attackUpInterval = null;
        },
        startAttackUpTimer() {
            this.attackUpInterval = setInterval(() => {
                this.showAttackUp = true;
                setTimeout(() => {
                    this.showAttackUp = false;
                }, 2000); // Duración de la animación (2 segundos)
            }, 5000); // Cada 10 segundos
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
        clearInterval(this.attackUpInterval);
    }
};
</script>


<style>
.player-header {
    padding: 10px;
    background-color: rgb(63, 63, 63);
    position: fixed;
    width: 100%;
}

.player-header .container {
    display: flex;
    align-items: center;
}

.player-header .barras {
    padding-left: 10px;
}

.player-header .player-container {
    padding: 5px;
    border-radius: 5%;
    background-color: gray;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

.player-header p {
    padding: 5px;
    text-decoration: none;
    font-weight: bold;
    color: rgb(255, 255, 255);
}

.events {
    display: flex;
    align-items: center;
    flex-direction: column
}

.attackup-container {
    position: relative;
}

.attackup-container img {
    position: relative;
}

.attackup-placeholder {
    visibility: hidden;
}

.barra-hp {
    width: 100%;
    height: 10px;
    background-color: red;
    margin-top: 5px;
}

.relleno-hp {
    height: 100%;
    background-color: green;
    transition: width 0.3s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>