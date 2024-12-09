<template>
  <main>
    <section>
      <header>
        <h1 v-if="IslaFavorite">{{ IslaFavorite.isla }} Vial</h1>
        <RouterLink v-if="userFromDb?.type_user === 'admin'" :to="{ name: 'bot-adminmemu' }">
          <h2>Admin</h2>
        </RouterLink>
        <aside>
          <mainButtton @click="irNuevaAlerta()" valueText="Nueva Alerta" />
          <RouterLink :to="{ name: 'bot-cameras' }">
            <mainButtton valueText="Cámaras de tráfico" />
          </RouterLink>
        </aside>
        <AnimatedSticker stickerPath="/stickers/koala_traffic_sticker.json" :size="250" :loop="true" :autoplay="true" />
      </header>
      <RouterLink :to="{ name: 'bot-settings' }">
        <article id="ajustes">
          <div id="ajustesico"></div>
          <p>Ajustes</p>
        </article>
      </RouterLink>
    </section>
    <p id="version">{{ versionWebApp }} </p>
  </main>
</template>
<script setup lang="ts">
import('@/assets/basebot.css');
import AnimatedSticker from "../../components/assets/StickerAnimated.vue"
import * as userService from '@/services/user'
import mainButtton from '@/components/assets/mainButtton.vue';
import type { Isla } from "@/models/Isla"
import { ref, onMounted } from "vue"
import islas from '@/islas.json'
import router from '@/router'
import type { UserType } from "@/models/TelegramUser"
const versionWebApp = window.Telegram.WebApp.version
const nombre = ref('')
const intancia = ref('')
const IslaFavorite = ref()
const userFromDb = ref<UserType>()

onMounted(async () => {
  window.Telegram.WebApp.ready()
  window.Telegram.WebApp.BackButton.onClick(() => {

    router.back()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()
  })

  window.Telegram.WebApp.MainButton.hide()
  window.Telegram.WebApp.setHeaderColor("secondary_bg_color")
  let dataUser = window.Telegram.WebApp.initDataUnsafe.user
  if (window.Telegram.WebApp.initDataUnsafe.chat_instance) {
    intancia.value = window.Telegram.WebApp.initDataUnsafe.chat_instance
  }
  if (window.Telegram.WebApp.initDataUnsafe.user?.first_name) {
    nombre.value = window.Telegram.WebApp.initDataUnsafe.user?.first_name

  }

  if (!dataUser) return
  const userInDb = await userService.telegramUserInDB(dataUser.id)

  //Si no hay usuario crear

  if (userInDb.status === 404)

    window.Telegram.WebApp.showConfirm(`Vamos a registrar tus datos básicos:\nIdTelegram: ${dataUser?.id}\nNombre: ${dataUser?.first_name}\nApellido: ${dataUser?.last_name}\n`, ((confirm) => {
      if (confirm) {
        userService.createUser(dataUser)
      } else {
        window.Telegram.WebApp.close()
      }
    }))

  //Ver para que isla va a ser la alerta.
  if (window.Telegram.WebApp.initDataUnsafe.start_param) {
    //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
    //api_request.IslefromInstance(window.Telegram.WebApp)

    //De momento se queda igual:     

    let findedIsle = islas.find((isl: Isla) => isl.id === window.Telegram.WebApp.initDataUnsafe.start_param)
    if (findedIsle) {
      IslaFavorite.value = findedIsle

      return
    }

  }

  let getUser = await userService.getUserFromIdTelegram(dataUser.id)
  userFromDb.value = getUser.data
  console.log(userFromDb)
  let findedIsle = islas.find((isl: Isla) => isl.id === getUser.data.favorite_isle)
  if (findedIsle) IslaFavorite.value = findedIsle





})


const irNuevaAlerta = () => {

  if (IslaFavorite.value) {
    router.push({ name: 'bot-nuevaalerta' });
  } else {
    router.push({ name: 'bot-selectorisla' });
  }
}


</script>

<style scoped>
#camera {
  width: 50px;
  height: 50px;
}

aside {
  width: 100%;
  margin: 1rem;
  display: flex;
  justify-content: space-around;
}

header {

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
}

header p {
  margin: 0;
  font-size: 1.4rem;
}

#ajustes {
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;

  background-color: var(--color-background);
  margin: 0.2rem 0;


}

#ajustes p {

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

h1 {
  margin: 0;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>