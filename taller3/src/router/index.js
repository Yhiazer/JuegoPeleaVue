// router.js
import { createRouter, createWebHistory } from 'vue-router';
import { useGameDataStore } from '@/stores/store'; // Importa el store de Pinia

import Login from '@/views/LoginView.vue';
import App from '@/views/PrincipalView.vue';
import Seleccion from '@/views/SelectCharacterView.vue';
import Game from '@/views/GameView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'principal',
      component: App
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/seleccion',
      name: 'seleccion',
      component: Seleccion
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      // Opcional: puedes usar un guard de navegación para cargar datos desde el store de Pinia antes de entrar en la ruta
      beforeEnter: (to, from, next) => {
        const selectedImages = useGameDataStore().selectedImages;
        // Por ejemplo, puedes realizar una carga de datos desde el store de Pinia antes de entrar en la ruta
        // useGameDataStore().fetchData();
        next();
      }
    },
  ]
});

export default router;
