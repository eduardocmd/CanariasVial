<template>
  <main>
    <section v-if="status === 0">
      <!--Estado cargando-->
      <span class="loader"></span>
     
    </section>
    <section v-if="status === 200">
      <!--Estado funciona el server-->
      <h2>Bienvenido {{ nombre }}</h2>
      <p>Instancia{{ intancia }}</p>
     
      <AlertsSelector />
    </section>
    <section v-if="status === 500">
      <!--No funciona el server-->
    <div id="dont-work">
      <img src="../../assets/banned.svg" alt="">
      <p>Opss... Los servidores no funcionan correctamente</p>
      <p>Instancia{{ intancia }}</p>
    </div>
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
const intancia = ref('')

let status = ref(0)

onMounted(async () => {
  if(window.Telegram.WebApp.initDataUnsafe.chat_instance) {
    intancia.value = window.Telegram.WebApp.initDataUnsafe.chat_instance
  }
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name
 
  }
  //Comprobar si los servidores funcinan Status retorna un boolean a true.

  await api_request.sleep(800)

  status.value = await api_request.getStatus()
 

  let dataUser = window.Telegram.WebApp.initDataUnsafe.user
  const userInDb = await api_request.checkUser(dataUser, window.Telegram.WebApp.initData)
  //Si no hay usuario crear

  if (userInDb.status === 404)

    window.Telegram.WebApp.showConfirm(`Vamos a registrar tus datos básicos:\nIdTelegram: ${dataUser?.id}\nNombre: ${dataUser?.first_name}\nApellido: ${dataUser?.last_name}\n`, ((confirm) => {
      if (confirm) {
        api_request.createUser(window.Telegram.WebApp.initDataUnsafe.user, window.Telegram.WebApp.initData)
      } else {
        window.Telegram.WebApp.close()
      }
    }))

})





</script>

<style scoped> 
#dont-work{
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
   position: absolute;
   margin-left: auto;
   margin-right: auto;
   left: 0;
   right: 0;
   bottom: 50%;
   text-align: center;
}
#dont-work p{
  width: 100%;
  text-align: center;
}
#dont-work img{
  height: 200px;
}


 #version {
   position: absolute;
   bottom: 1rem;
   right: 1rem;
   font-size: 0.5rem;
   margin: 0;
 }

 main {

   background-color: var(--color-background-soft);

 }
 .loader {
  width: 96px;
  height: 48px;
  display: inline-block;
  position: relative;
  background:var(--color-hint);
  border-radius: 48px 48px 0 0;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
   margin-left: auto;
   margin-right: auto;
   left: 0;
   right: 0;
   bottom: 50%;
   text-align: center;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  width: 24px;
  height: 12px;
  border-radius: 24px 24px 0 0;
  background: var(--color-text);
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
.loader::before {
  content: '';  
  position: absolute;
  width: 4px;
  height: 32px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  background:  var(--color-text);
  transform-origin: 50% 100%;
  box-sizing: border-box;
  animation: animloader 2s linear infinite alternate;
}

@keyframes animloader {
  0% {
    transform: rotate(-70deg);
  }
  10% {
    transform: rotate(-40deg);
  }
  20%, 45%, 35% {
    transform: rotate(-10deg);
  }
  40%, 30% {
    transform: rotate(-30deg);
  }
  50%, 60% {
    transform: rotate(20deg);
  }
  55%, 65%, 75% {
    transform: rotate(40deg);
  }
  70% {
    transform: rotate(45deg);
  }
  85%, 90% {
    transform: rotate(50deg);
  }
  95% {
    transform: rotate(75deg);
  }
  100%, 93% {
    transform: rotate(70deg);
  }
}

</style>