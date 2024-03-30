import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/AboutView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue'),
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('../views/WalletView.vue'),
  },
  {
    path: '/assets',
    name: 'assets',
    component: () => import('../views/AssetsView.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogoutView.vue'),
    meta: {
      hideNavBar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const endpoint = '/auth/validate';
    fetch(process.env.VUE_APP_API_URL + endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.ok ? next() : next({
        name: 'home'
      });
    }).catch(() => {
      next({
        name: 'home'
      });
    });
  }
  next();
});
export default router;
