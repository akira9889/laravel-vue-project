import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue'
import Login from '@/Auth/Login.vue'
import Signup from '@/Auth/Signup.vue'
import RequestPassword from '@/Auth/RequestPassword.vue'
import ResetPassword from '@/Auth/ResetPassword.vue'
import Mypage from '@/Mypage.vue'
import Dashboard from '@/Dashboard.vue'
import store from '../store';
import AuthService from '../services/AuthService';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/mypage',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'mypage',
        name: 'mypage',
        component: Mypage,
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/request-password',
    name: 'requestPassword',
    component: RequestPassword,
    meta: { requiresGuest: true }
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
    meta: { requiresGuest: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

async function checkAuthStatus() {
  return await AuthService.checkAuthStatus()
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && store.state.auth.isLoggedIn) {
    const isLoggedIn = await checkAuthStatus()

    if (isLoggedIn) {
      next({ name: 'mypage' })
    } else {
      store.commit('auth/setLoggedIn', false)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router;
