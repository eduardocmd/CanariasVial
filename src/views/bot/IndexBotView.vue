<template>
    <h2>Prueba</h2>
    {{ nombre }}
<AlertsSelector/>
</template>
<script setup lang="ts">
  import { loadScript } from "vue-plugin-load-script";
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import { ref, onMounted } from "vue"
const nombre = ref('')

onMounted(async() => {
  await loadScript(import.meta.env.VITE_APP_Telegram_Script);
if(window.Telegram.WebApp.initDataUnsafe.user?.first_name){
  nombre.value =window.Telegram.WebApp.initDataUnsafe.user?.first_name
}
  
  

})



</script>