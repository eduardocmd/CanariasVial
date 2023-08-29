<template>
    <h2>Prueba</h2>
</template>
<script lang="ts">
 import { loadScript } from "vue-plugin-load-script";
export default {
 async mounted() {
   await loadScript("https://telegram.org/js/telegram-web-app.js")
   console.log(window.Telegram)
 

  }
};
</script>