import './assets/style.css';
import './assets/styles/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/useAuthStore';

const app = createApp(App);
const pinia = createPinia();

// Use Pinia first
app.use(pinia);
app.use(router);

const auth = useAuthStore();
auth.getAuthenticatedUser();

app.mount('#app');
