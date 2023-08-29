import './assets/main.css'
import LoadScript from "vue-plugin-load-script";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(LoadScript);

app.use(router)

app.mount('#app')
