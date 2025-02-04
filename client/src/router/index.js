import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import SignInView from '@/views/SignInView.vue';
import optionsview from '@/views/optionsView.vue';
import myjobsview from '@/views/MyJobsView.vue';
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
      path: '/alljobs',
      name: 'alljobs',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: AddJobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView,
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
    {
      path: '/options',
      name: 'options',
      component: optionsview,
    },
    {
      path: '/myjobs',
      name: 'myjobs',
      component: myjobsview,
    }
  ],
});

export default router;
