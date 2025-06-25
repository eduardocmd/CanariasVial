import './assets/main.css'
import piniaPersist from 'pinia-plugin-persistedstate' // Importamos el plugin
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(piniaPersist)  // Usamos el plugin de persistencia


app.use(router)
   .use(pinia)
app.mount('#app')

