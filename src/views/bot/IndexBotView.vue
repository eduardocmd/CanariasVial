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

<p id="version">Bot Alertas Canarias Vial - WebApp v{{ versionWebApp }} </p>
  </main>
</template>
<script setup lang="ts">

import * as api_request from "@/api_request"
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import { ref, onMounted } from "vue"
const versionWebApp = window.Telegram.WebApp.version
const nombre = ref('')

let status = ref(0)

onMounted(async () => {
 
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name
  }
  //Comprobar si los servidores funcinan Status retorna un boolean a true.
   window.Telegram.WebApp.ready()
  await api_request.sleep(800)
  status.value = await api_request.getStatus()
  console.log("Datos usuario")

 const response =  await api_request.checkUser(window.Telegram.WebApp.initDataUnsafe.user , window.Telegram.WebApp.initData)
//Si no hay usuario crear
if(response.status === 404){
  api_request.createUser(window.Telegram.WebApp.initDataUnsafe.user , window.Telegram.WebApp.initData)
}
 

})





</script>

<style scoped> 

#version{
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.5rem;
  margin: 0;
}

main{
  
  background-color:  var(--color-background-soft);
 
}

</style>