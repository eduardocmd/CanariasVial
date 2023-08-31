<template>
    <h2>Prueba</h2>
<AlertsSelector/>
</template>
<script setup lang="ts">
  import { loadScript } from "vue-plugin-load-script";
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import { onMounted } from "vue"

onMounted(async() => {

  await loadScript(import.meta.env.VITE_APP_Telegram_Script);
  

})



</script>