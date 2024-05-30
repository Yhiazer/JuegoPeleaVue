<template>
    <div style="width: 75px; height: 75px; position: absolute;">
        <img src="../media/Personajes/zoro.gif" width="75px" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Player',
            maxHealth: Math.floor(Math.random() * 30 + 10),
            health: 0,
            damage: Math.floor(Math.random() * 10 + 1),
            actionPoints: 50, // Barra de acción inicializada a 50
            actionInterval: null // Intervalo para recargar la barra de acción
        }
    },
    mounted() {
        this.health = this.maxHealth;
        this.startActionRecharge();
    },
    beforeDestroy() {
        clearInterval(this.actionInterval);
    },
    methods: {
        isAlive() {
            return this.health > 0;
        },

        calcularEvento(danyo) {
            this.getDanyo();
            var x = Math.floor(Math.random() * 5);
            if (x == 0) {
                danyo = danyo * 3;
                console.log("Critico " + danyo + " Damage!!");
            } else if (x == 1 || x == 2) {
                danyo = danyo * 0;
                console.log("Fallo!!");
            }
            return danyo;
        },

        attack_manual(danyo, number) {
            this.health -= this.calcularEvento(danyo);
            if (this.health <= 0) {
                setTimeout(function () {
                    window.alert("Perdiste Jugador "+number);
                }, 1000);
            }
        },

        getDanyo() {
            this.$emit('send-data', this.damage);
        },

        startActionRecharge() {
            this.actionInterval = setInterval(() => {
                if (this.actionPoints < 50) {
                    this.actionPoints += 1; // Incrementa la barra de acción cada segundo
                }
            }, 1000);
        },

        useActionPoints(points) {
            this.actionPoints -= points;
            if (this.actionPoints < 0) this.actionPoints = 0;
        }
    }
}
</script>