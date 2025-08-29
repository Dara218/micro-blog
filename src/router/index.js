import Home from '@/views/Page/Home.vue'
import LandingPage from '@/views/Page/LandingPage.vue'
import LoginPage from '@/views/Page/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
})

export default router
