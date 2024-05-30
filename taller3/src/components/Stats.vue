<template>
    <header class="player-header">
        <div class="container">
            <div class="player-container">
                <div>
                    <div v-if="player1Health > 0.5">
                        <img src="@/media/Personajes/Zoro/idle-face.jpg" width="100px" alt="zoro-idle.png">
                    </div>
                    <div v-else>
                        <img src="@/media/Personajes/Zoro/dead-face.png" width="100px" alt="zoro-dead.png">
                    </div>
                </div>
                <div class="barras">
                    <p>Player 1 : Name</p>
                    <div class="barra-hp">
                        <div class="relleno-hp" :style="{ width: player1HealthPercentage }"></div>
                    </div>
                </div>
            </div>
            <div class="player-container">
                <div>
                    <div v-if="player2Health > 0.5">
                        <img src="@/media/Personajes/Zoro/idle-face.jpg" width="100px" alt="zoro-idle.png">
                    </div>
                    <div v-else>
                        <img src="@/media/Personajes/Zoro/dead-face.png" width="100px" alt="zoro-dead.png">
                    </div>
                </div>
                <div class="barras">
                    <p>Player 2 : Name</p>
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
    computed: {
        player1HealthPercentage() {
            return `${(this.player1Health / this.player1MaxHealth) * 100}%`;
        },
        player2HealthPercentage() {
            return `${(this.player2Health / this.player2MaxHealth) * 100}%`;
        }
    }
};
</script>

<style>
.player-header {
    background-color: transparent;
    position: fixed;
    width: 100%;
}

.player-header .container {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
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
</style>
