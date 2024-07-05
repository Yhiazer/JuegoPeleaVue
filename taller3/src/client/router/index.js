import { createRouter, createWebHistory } from 'vue-router';
import { useGameDataStore } from '@/client/stores/imagenes'; // Importa el store de Pinia

import Login from '@/client/views/LoginView.vue';
import App from '@/client/views/PrincipalView.vue';
import Seleccion from '@/client/views/SelectCharacterView.vue';
import Game from '@/client/views/GameView.vue';
import GameOver from '@/client/views/GameOverView.vue';
import Wiki from '@/client/views/WikiView.vue';
import Perfil from '@/client/views/PerfilView.vue';
import Register from '@/client/views/RegisterView.vue';
import Edit from '@/client/views/EditView.vue';

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  return !!localStorage.getItem('username');
}

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
      beforeEnter: (to, from, next) => {
        const selectedImages = useGameDataStore().selectedImages;
        next();
      }
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOver,
      props: route => ({ winner: route.params.winner, combatTime: route.params.combatTime })
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: Wiki
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
  ]
});

// Guard global para proteger las rutas
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/wiki'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isAuthenticated();

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;