<template>
  <main>
    <section v-if="status === 200">
      <h2>Prueba</h2>
      {{ nombre }}
      <AlertsSelector />
    </section>
    <section v-if="status === 500">
      <p>No cargó</p>
    </section>

  </main>
</template>
<script setup lang="ts">
import { loadScript } from "vue-plugin-load-script";
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import { ref, onMounted } from "vue"
import axios from 'axios';

const nombre = ref('')
let status = ref(0)

onMounted(async () => {
  await loadScript(import.meta.env.VITE_APP_Telegram_Script);
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name
  }

  status.value = await getStatus()

})

const getStatus = async (): Promise<number> => {
  let salida = 500
  const configuracion = {

    method: 'GET',
    url: `${import.meta.env.VITE_APP_Web_IP}/status`
  }

  try {
    console.log(configuracion.url)
    let respuesta = await axios(configuracion)
    if (respuesta.status === 200) salida = respuesta.status

  } catch (error) {
    console.log(error)
  }
  return salida

}



</script>