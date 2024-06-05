// router.js
import { createRouter, createWebHistory } from 'vue-router';
import { useGameDataStore } from '@/client/stores/imagenes'; // Importa el store de Pinia

import Login from '@/client/views/LoginView.vue';
import App from '@/client/views/PrincipalView.vue';
import Seleccion from '@/client/views/SelectCharacterView.vue';
import Game from '@/client/views/GameView.vue';
import GameOver from '@/client/views/GameOverView.vue'

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
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOver,
      props: route => ({ winner: route.params.winner, combatTime: route.params.combatTime })
    },
  ]
});

export default router;
