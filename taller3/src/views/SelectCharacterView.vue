<template>
  <div>
    <h1 style="text-align: center; padding: 2%;">Selección de Personajes</h1>

    <div class="carousel-container">
      <!-- Primer carrusel para las primeras 3 imágenes -->
      <carousel :autoplay="0" class="carousel" v-model="currentSlide1">
        <slide v-for="(image, index) in firstCarouselImages" :key="image.id">
          <img :src="image.url" alt="Carousel Image" :height="200">
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>

      <!-- Segundo carrusel para las imágenes restantes -->
      <carousel :autoplay="0" class="carousel" v-model="currentSlide2">
        <slide v-for="(image, index) in secondCarouselImages" :key="image.id">
          <img :src="image.url" alt="Carousel Image" :height="200">
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>

    <div class="row mt-3" style="padding-top: 30px;">
      <div class="col text-center">
        <!-- Agrega un manejador de clic para el botón -->
        <button id="selectImages" class="btn btn-primary" @click="confirmSelection">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useGameDataStore } from '@/stores/imagenes';

export default {
  name: 'SelectCharacterView',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      currentSlide1: 0,
      currentSlide2: 0,
      images: [
        { id: 1, url: 'src/media/Personajes/Caballero/model.jpg' },
        { id: 2, url: 'src/media/Personajes/Max/model.png' },
        { id: 3, url: 'src/media/Personajes/Luffy/model.gif' },
        { id: 4, url: 'src/media/Personajes/Slime/model.jpg' },
        { id: 5, url: 'src/media/Personajes/Zoro/model.gif' },
        { id: 6, url: 'src/media/Personajes/Terreneitor/model.jpg' }
      ],
      // Variables para almacenar los índices seleccionados de los carruseles
      firstCarouselIndex: 0,
      secondCarouselIndex: 0
    };
  },
  watch: {
    currentSlide1(newIndex) {
      this.handleCarouselChange(newIndex);
    },
    currentSlide2(newIndex) {
      this.handleSecondCarouselChange(newIndex);
    }
  },
  computed: {
    firstCarouselImages() {
      return this.images.slice(0, 3);
    },
    secondCarouselImages() {
      return this.images.slice(3);
    }
  },
  methods: {
    handleCarouselChange(index) {
      this.firstCarouselIndex = index;
    },
    handleSecondCarouselChange(index) {
      this.secondCarouselIndex = index;
    },
    confirmSelection() {
      let imagenes = [this.firstCarouselImages[this.firstCarouselIndex].url, this.secondCarouselImages[this.secondCarouselIndex].url];
      console.log(imagenes);
      if (Array.isArray(imagenes)) {
        useGameDataStore().setSelectedImages(imagenes);
        this.$router.push({ name: 'game' });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* Estilos para que los carruseles estén uno al lado del otro */
.carousel-container {
  display: flex;
}

.carousel {
  flex: 1;
  margin: 0 10px;
}
</style>
