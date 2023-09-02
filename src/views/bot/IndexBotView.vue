<template>
  <main>
    <section v-if="status === 0">
      <!--Estado cargando-->
<p>Cargando</p>
    </section>
    <section v-if="status === 200">
          <!--Estado funciona el server-->
      <h2>Bienvenido {{ nombre }}</h2>
      <AlertsSelector />
    </section>
    <section v-if="status === 500">
          <!--No funciona el server-->
      <p>No cargó</p>
    </section>


  </main>
</template>
<script setup lang="ts">
import { loadScript } from "vue-plugin-load-script";
import * as api_request from "@/api_request"
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import { ref, onMounted } from "vue"
const nombre = ref('')
let status = ref(0)

onMounted(async () => {
  await loadScript(import.meta.env.VITE_APP_Telegram_Script);
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name
  }
  //Comprobar si los servidores funcinan Status retorna un boolean a true.
  status.value = await api_request.getStatus()

})





</script>