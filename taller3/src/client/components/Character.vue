<template>
    <div style="height: 75px; position: absolute;">
        <div v-if="health > 0.5">
            <img :src="currentImageUrl" height="75px" alt="model.gif">
        </div>
        <div v-else>
            <img src="../media/Misc/explosion.gif" width="75px" alt="explosion.gif">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Player',
            maxHealth: 100, /*Math.floor(Math.random() * 30 + 100)*/
            health: 0,
            damage: Math.floor(Math.random() * 10 + 1),
            currentImageUrl: this.imageUrl,
        }
    },
    props: {
        imageUrl: {
            type: String,
            required: true
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
            } else if (x == 1 ) {
                danyo = danyo * 0;
                console.log("Fallo!!");
            }
            return danyo;
        },

        attack_manual(danyo) {
            this.health -= this.calcularEvento(danyo);
            this.efectoTp();
            if (this.health <= 0) {
                this.health = 0;
            }
        },

        getDanyo() {
            this.$emit('send-data', this.damage);
        },

        goToGameOver() {
            this.$router.push({ name: 'gameover' });
        },

        efectoTp(){
            setTimeout(() => {
                this.currentImageUrl = (this.currentImageUrl === this.imageUrl) ? 'src/client/media/Misc/tp.png' : this.imageUrl;
            }, 100);
            this.currentImageUrl = (this.currentImageUrl === this.imageUrl) ? 'src/client/media/Misc/tp.png' : this.imageUrl;
        },
    }
}
</script>