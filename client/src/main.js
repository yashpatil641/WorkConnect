import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';
import { clerkPlugin } from '@clerk/vue';
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
});

app.use(router);
app.use(Toast);

app.mount('#app');
