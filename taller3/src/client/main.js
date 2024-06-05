// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa tu router configurado
import { createPinia } from 'pinia'; // Importa la función createPinia
import './assets/main.css';

const app = createApp(App);

// Instala Pinia en la aplicación
const pinia = createPinia();
app.use(pinia);

// Usa el router en la aplicación
app.use(router);

app.mount('#app');
