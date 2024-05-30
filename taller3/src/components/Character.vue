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
            maxHealth: Math.floor(Math.random() * 30 + 100),
            health: 0,
            damage: Math.floor(Math.random() * 10 + 1)
        }
    },
    mounted() {
        this.health = this.maxHealth;
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
                this.health = 0;
                setTimeout(function () {
                    window.alert("Perdiste Jugador "+number);
                }, 1000);
            }
        },

        getDanyo() {
            this.$emit('send-data', this.damage);
        },
    }
}
</script>