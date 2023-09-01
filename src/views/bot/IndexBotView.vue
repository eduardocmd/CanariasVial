<template>
  <main>
    <section v-if="status">
      <h2>Prueba</h2>
      {{ nombre }}
      <AlertsSelector />
    </section>
    <section v-else>
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
let status = ref(false)

onMounted(async () => {
  await loadScript(import.meta.env.VITE_APP_Telegram_Script);
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name
  }

  status.value = await getStatus()

})

const getStatus = async ():Promise<boolean> => {
  let salida = false
  const configuracion = {

    method: 'GET',
    url: `${import.meta.env.VITE_APP_Web_IP}/status`
  }

try {
  console.log(configuracion.url)
  let respuesta  = await axios(configuracion)
  if (respuesta.status === 200) salida = true 
  
} catch (error) {
  console.log(error)
}
return salida

}



</script>