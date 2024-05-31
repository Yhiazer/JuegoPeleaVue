import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/LoginView.vue'
import App from '@/views/PrincipalView.vue'
import Game from '@/views/GameView.vue'
import GameOver from '@/views/GameOverView.vue'

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
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOver
    }
  ]
})

export default router
