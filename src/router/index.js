import { useAuthStore } from '@/stores/useAuthStore'
import Home from '@/views/Page/Home.vue'
import LandingPage from '@/views/Page/LandingPage.vue'
import LoginPage from '@/views/Page/LoginPage.vue'
import RegisterUser from '@/views/Page/RegisterUser.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser,
      meta: { requiresGuest: true },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // If route requires auth BUT user is NOT authenticated
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  // If route requires guest BUT user IS authenticated
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return next({ path: '/home' });
  }

  // If no redirect needed, continue
  next();
});

export default router;