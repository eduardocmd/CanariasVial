<template>
  <main v-if="!loading">
    <section v-if="!pendingAlert" id="datosAlerta">
      <h2>Publicar <span v-if="alertSelect"> {{ alertSelect.tipo }}</span> </h2>

      <AlertsSelector @alertaSeleccionada="handleAlertChange" :isla="islaSelect"></AlertsSelector>
      <textarea v-model="alerta" placeholder="Introduce la alerta" id="alerta" rows="1" type="text"
        style="overflow: hidden; overflow-wrap: break-word; "></textarea>
     <VoiceRecognition @transcriptText="alerta = $event" :text="alerta"></VoiceRecognition>
    </section>
    <section v-else id="salidaAlerta">

      <RefreshTime @refreshTime="refreshTime" :userId="user?._id"></RefreshTime>
    </section>
  </main>
  <main v-if="loading">
   <MainLoader></MainLoader>

  </main>
</template>

<script setup lang="ts">
import VoiceRecognition from "@/components/VoiceRecognition.vue"
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import alertasJSON from "@/alertas.json"
import('@/assets/basebot.css');
import type { AlertaType } from '@/models/Alerts'
import type { UserType } from '@/models/TelegramUser'
import islas from '@/islas.json'
import type { Isla } from "@/models/Isla"
import * as userService from "@/services/user";
import * as alertService from "@/services/alertas"
import router from '@/router'
import AlertsSelector from "@/components/bot/AlertsSelector.vue";
import RefreshTime from "@/components/bot/RefreshTime.vue";
import MainLoader from "@/components/MainLoader.vue"
// Obtén la información de la ruta actual
const route = useRoute()
const ruta = ref()
const loading = ref(false);
const islaSelect = ref()
const user = ref<UserType>()
ruta.value = route.params.tipo
const alerta = ref()
const alertSelect = ref<any>(null);  // Almacenará el tipo de alerta seleccionada
//Si no está disponible
const pendingAlert = ref(true)
//Mensaje 
const msgResponse = ref('')
const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

onMounted(async () => {
  loading.value = true
  await wait(2000)
  settingTelegram()


  if (!window.Telegram.WebApp.initDataUnsafe.user) return
  let response = await userService.getUserFromIdTelegram(window.Telegram.WebApp.initDataUnsafe.user.id)
  user.value = response.data

  loading.value = false

});
// Funciones 
const handleAlertChange = (alertaSeleccionada: Ref) => {
  alertSelect.value = alertaSeleccionada.value;
  window.Telegram.WebApp.MainButton.setParams({
    color: alertSelect.value.color,

  })
};

const refreshTime = async (data: boolean) => {
 
 pendingAlert.value = data

 if (!data) {

   if (user.value) {

     let responseisActive = await alertService.alertSessionById(window.Telegram.WebApp.initDataUnsafe.start_param || '')
     alerta.value = responseisActive.data.alerta
     window.Telegram.WebApp.BackButton.show()
     window.Telegram.WebApp.MainButton.show()
     window.Telegram.WebApp.MainButton.setText('Enviar Alerta')
     let alertaF = alertasJSON.filter((alerta) => alerta.tipo === ruta.value)
     window.Telegram.WebApp.MainButton.setParams({
       color: 'rgb(78, 78, 78)',
     })

   }
 }

}
const settingTelegram = async () => {


  window.Telegram.WebApp.BackButton.onClick(() => {
    //router.back()
    router.push({ name: 'bot' });
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()
  })


  const params = new URLSearchParams(window.location.search);
  const isle = params.get('isle') || '';

  //Ver para que isla va a ser la alerta.
  if (isle) {
    //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
    //api_request.IslefromInstance(window.Telegram.WebApp)
    //De momento se queda igual:     
    let findedIsle = islas.find((isl: Isla) => isl.id === isle)
    if (findedIsle) {
      islaSelect.value = findedIsle

    }

  }
  if (user.value) {
    let idIslaUsuario = user.value.favorite_isle
    let findedIsle = islas.find((isl: Isla) => isl.id === idIslaUsuario)
    if (findedIsle) islaSelect.value = findedIsle
  }


  window.Telegram.WebApp.MainButton.onClick(async () => {

    //Methods
    if (alerta.value) {
      window.Telegram.WebApp.MainButton.disable()
      window.Telegram.WebApp.MainButton.showProgress()
      let tipoAlerta: string = Array.isArray(route.params.tipo) ? route.params.tipo[0] : route.params.tipo
      if (!user.value?._id) return
      let nuevalerta: AlertaType = {
        _id: '',
        isla: islaSelect.value.id,
        alerta: alerta.value,
        id_usuario: user.value?._id,
        tipo_alerta: tipoAlerta
      }
      if (!window.Telegram.WebApp.initDataUnsafe.user) return
      let sendedAlert = await alertService.sendAlert(nuevalerta, window.Telegram.WebApp.initDataUnsafe.user)
      window.Telegram.WebApp.MainButton.hide()
      window.Telegram.WebApp.MainButton.hideProgress()
      window.Telegram.WebApp.MainButton.enable()
      pendingAlert.value = true
      msgResponse.value = sendedAlert.data
      //if(salida.status === 200) window.Telegram.WebApp.MainButton.hide()

    }
  })
}



</script>
<style scoped>




main {
  padding: 1rem;

}

.msg {
  text-align: center;
}

#alerta {

  min-height: 100px;
  margin-bottom: 2em;
  font-size: 17px;
  color: black;
  line-height: 21px;
  -webkit-font-smoothing: antialiased;
  padding: 20px 20px 36px;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  outline: none;
  border: none;

  border-radius: var(--border-radius);
  resize: none;
  color: var(--text-color);
  background: var(--color-background);
  -webkit-user-select: auto;
  user-select: auto;
  cursor: auto;
  width: 100%;
}
</style>