<template>
    <div class="navbar">
        <Stats :images="selectedImages" :player1Health="player1Health" :player1MaxHealth="player1MaxHealth" :player2Health="player2Health"
            :player2MaxHealth="player2MaxHealth" />
    </div>
    <div class="estadio">

        <Stadium :images="selectedImages" @health-updated="updateHealth" />

    </div>
</template>

<script>
import Stadium from '@/components/Stadium.vue'
import Stats from '@/components/Stats.vue'
import { useGameDataStore } from '@/stores/store';

export default {
    components: {
        Stadium,
        Stats
    },
    computed: {
        selectedImages() {
            return useGameDataStore().selectedImages;
        },
    },
    mounted() {
        console.log('selectedImages:', this.selectedImages);
    },
    data() {
        return {
            player1Health: 100,
            player1MaxHealth: 100,
            player2Health: 100,
            player2MaxHealth: 100,
        }
    },
    methods: {
        updateHealth(data) {
            console.log("Received health update:", data);
            this.player1Health = data.player1Health;
            this.player2Health = data.player2Health;
        }
    }
}
</script>


<style>
.navbar {
    position: fixed;
    z-index: 10;
}

.estadio {
    min-width: 100vh;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 15px;
    z-index: 1;
}
</style>
