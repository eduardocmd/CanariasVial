<template>
    <h2>Prueba</h2>
   <p>Hola  {{ nombre }}</p>
   <p>Instancia {{ instance }}</p>
</template>
<script lang="ts">
 import { loadScript } from "vue-plugin-load-script";
export default {
 async created() {
  await loadScript("http://telegram.org/js/telegram-web-app.js")
if(window.Telegram.WebApp.initDataUnsafe.user){
  this.nombre =  window.Telegram.WebApp.initDataUnsafe.user?.first_name
  this.instance = window.Telegram.WebApp.initDataUnsafe.chat_instance
}





  },
  data() {
    return {
      nombre: '',
      instance: ''
    }
  }
};
</script>