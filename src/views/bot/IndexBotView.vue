<template>
  <main>
    <section v-if="status === 0">
      <!--Estado cargando-->
      <span class="loader"></span>

    </section>
    <section v-if="status === 200">
      <header>
        <h1 v-if="IslaFavorite">{{ IslaFavorite.isla }} Vial</h1>
      
      </header>
      <!--Estado funciona el server-->



      <AlertsSelector :isla="IslaFavorite" />
      <RouterLink :to="{ name: 'bot-settings' }">
      <article id="ajustes"> <div id="ajustesico"></div> <p>Ajustes</p></article>
    </RouterLink>
    </section>
    <section v-if="status === 500">
      <!--No funciona el server-->
      <div id="dont-work">
        <h2>Error 500</h2>
        <p>Opss... Los servidores no funcionan correctamente</p>
      </div>
    </section>

    <p id="version">Bot Alertas Canarias Vial - WebApp v{{ versionWebApp }} </p>
  </main>
</template>
<script setup lang="ts">

  import * as api_request from "@/api_request"
import AlertsSelector from "@/components/bot/AlertsSelector.vue"
import type{ Isla } from "@/models/Isla"
import { ref, onMounted } from "vue"
import islas from '@/islas.json'
const versionWebApp = window.Telegram.WebApp.version
const nombre = ref('')
const intancia = ref('')
const IslaFavorite = ref()

let status = ref(0)

onMounted(async () => {
  window.Telegram.WebApp.setHeaderColor("secondary_bg_color")
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

  if (!dataUser) return
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
  if (window.Telegram.WebApp.initDataUnsafe.start_param) {
    //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
    //api_request.IslefromInstance(window.Telegram.WebApp)

    //De momento se queda igual:     

    let findedIsle = islas.find((isl : Isla) => isl.id === window.Telegram.WebApp.initDataUnsafe.start_param)
  if(findedIsle)  {
    IslaFavorite.value = findedIsle
    status.value = newstatus
    return
  }

  } 

    let userFromDb = await api_request.getUserFromIdTelegram(dataUser, window.Telegram.WebApp.initData)
    let findedIsle = islas.find((isl : Isla) => isl.id === userFromDb.data.favorite_isle)
  if(findedIsle)   IslaFavorite.value = findedIsle

  


  status.value = newstatus
})





</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

header p {
  margin: 0;
  font-size: 1.4rem;
}
#ajustes{
 border-radius: 1rem;
display: flex;
align-items: center;

  background-color: var(--color-background);
  margin:  0.2rem 0;

  
}
#ajustes p{
 
  margin: 1rem;

}
#ajustesico {
  margin-left: 1rem;
  background: var(--color-button) url('../../assets/engranaje-invert.svg')no-repeat center/60%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
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
h1{
  margin: 0;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>