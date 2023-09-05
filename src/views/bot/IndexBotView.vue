<template>
  <main>
    <RouterLink   to="/bot/settings">Go to Home
        <div id="ajustes"></div>
      </RouterLink>
    <section v-if="status === 0">
      <!--Estado cargando-->
      <span class="loader"></span>

    </section>
    <section v-if="status === 200">
      <header>
     
      </header>
      <!--Estado funciona el server-->
      <h2>Bienvenido {{ nombre }}</h2>
      <h2>Isla favorita: {{ isla }}</h2>
      <p>Instancia{{ intancia }}</p>
  
      <AlertsSelector :isla="isla"/>
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
const isla = ref()

let status = ref(0)

onMounted(async () => {
  let dataUser = window.Telegram.WebApp.initDataUnsafe.user
  if (window.Telegram.WebApp.initDataUnsafe.chat_instance) {
    intancia.value = window.Telegram.WebApp.initDataUnsafe.chat_instance
  }
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name

  }
  //Comprobar si los servidores funcinan Status retorna un boolean a true.


  let newstatus = await api_request.getStatus()
  if (newstatus != 200) {
    status.value = newstatus
    return
  }
 
  if(!dataUser) return
  const userInDb = await api_request.checkUser(dataUser, window.Telegram.WebApp.initData)
  //Si no hay usuario crear

  if (userInDb.status === 404)

    window.Telegram.WebApp.showConfirm(`Vamos a registrar tus datos básicos:\nIdTelegram: ${dataUser?.id}\nNombre: ${dataUser?.first_name}\nApellido: ${dataUser?.last_name}\n`, ((confirm) => {
      if (confirm) {
        api_request.createUser(dataUser, window.Telegram.WebApp.initData)
      } else {
        window.Telegram.WebApp.close()
      }
    }))

    //Ver para que isla va a ser la alerta.
   if(window.Telegram.WebApp.initDataUnsafe.chat_instance){
     //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
     //api_request.IslefromInstance(window.Telegram.WebApp)
   }else{
    
    let userFromDb = await api_request.getUserFromIdTelegram(dataUser, window.Telegram.WebApp.initData)
   isla.value = userFromDb.data.favorite_isle 

   }


  status.value = newstatus
})





</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
}
#ajustes{
  
  background: var(--color-hint) url('../../assets/chincheta.png')no-repeat center/contain;

  width: 50px;
  height: 50px;
}


#dont-work {
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

 #dont-work p {
   width: 100%;
   text-align: center;
 }

 #dont-work img {
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
   width: 48px;
   height: 48px;
   border: 5px solid var(--color-text);
   border-bottom-color: transparent;
   border-radius: 50%;
   display: inline-block;
   box-sizing: border-box;
   animation: rotation 1s linear infinite;
   position: absolute;
   margin-left: auto;
   margin-right: auto;
   left: 0;
   right: 0;
   bottom: 50%;
   text-align: center;
 }

 @keyframes rotation {
   0% {
     transform: rotate(0deg);
   }

   100% {
     transform: rotate(360deg);
   }
 }</style>