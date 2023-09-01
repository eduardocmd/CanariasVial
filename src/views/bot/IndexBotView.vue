<template>
  <main>
    {{ status }}
    <section v-if="status === 200">
      <h2>Prueba</h2>
      {{ nombre }}
      <AlertsSelector />
    </section>
    <section v-if="status === 500">
      <p>No cargó</p>
    </section>
    <section v-else>
<p>Cargando</p>
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

  status.value = await api_request.getStatus()

})





</script>