<template>
    <h2>Prueba</h2>
   <p>Hola  {{ nombre }}</p>
   <p>Instancia {{ instance }}</p>
</template>
<script lang="ts">
 import { loadScript } from "vue-plugin-load-script";
export default {
 async created() {
  
  console.log(window.Telegram.WebApp.initDataUnsafe)
if(window.Telegram.WebApp.initDataUnsafe.user){
  this.nombre =  window.Telegram.WebApp.initDataUnsafe.user?.first_name
 
}else{
  this.nombre =  'Error al cargar nombre'
}
this.instance = import.meta.env.VITE_APP_Telegram_Script
console.log(import.meta.env.VITE_APP_Telegram_Script)





  },
  data() {
    return {
      nombre: '',
      instance: ''
    }
  }
};
</script>