import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useApiService } from './services/apiService';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inicializa o serviço apiService
useApiService();

app.mount('#app');
