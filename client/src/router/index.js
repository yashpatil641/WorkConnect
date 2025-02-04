import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import SignInView from '@/views/SignInView.vue';
import registerView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: registerView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },


    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignInView,
    },

 
  ],
});

export default router;
