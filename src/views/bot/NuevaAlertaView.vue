<template>
  <main v-if="!loading">
    <section v-if="!pendingAlert" id="datosAlerta">
      <div>
        <h3>{{ islaSelect.isla }}</h3>
        <AlertsSelector @alertaSeleccionada="handleAlertChange" :isla="islaSelect"></AlertsSelector>
      </div>
      <div>

        <MapaSelector @coordenadas-seleccionadas="manejarCoordenadas" />

        <section>
          <textarea v-model="alerta" placeholder="Introduce la alerta" id="alerta" rows="1" type="text"
            style="overflow: hidden; overflow-wrap: break-word; "></textarea>

          <!--<VoiceRecognition @transcriptText="alerta = $event" :text="alerta"></VoiceRecognition>-->
        </section>

      </div>




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
import MapaSelector from "@/components/MapaSelector.vue";
import { useIsleStore } from '@/stores/isle'


// Instanciamos el store
const isleStore = useIsleStore()

// Obtén la información de la ruta actual
const route = useRoute()
const ruta = ref()
const loading = ref(false);
const islaSelect = ref()
const alertCords = ref()
const user = ref<UserType>()
ruta.value = route.params.tipo
const alerta = ref()
const alertSelect = ref<any>(null);  // Almacenará el tipo de alerta seleccionada
//Si no está disponible
const pendingAlert = ref(true)
//Mensaje 
const msgResponse = ref('')
const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));
const manejarCoordenadas = (coordenadas: { lat: number; lng: number }) => {
  alertCords.value = coordenadas;
};


onMounted(async () => {
  loading.value = true
  await wait(200)


  let dataUser = window.Telegram.WebApp.initDataUnsafe.user

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



  let getUser = await userService.getUserFromIdTelegram(dataUser.id)
  user.value = getUser.data



  settingTelegram()
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

  window.Telegram.WebApp.MainButton.onClick(async () => {
    console.log("oooooooola")
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
        latitud: alertCords.value?.lat,
        longitud: alertCords.value?.lng,
        id_usuario: user.value?._id,
        tipo_alerta: alertSelect.value.tipo
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

  window.Telegram.WebApp.BackButton.onClick(() => {
    //router.back()
    router.push({ name: 'bot' });
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()
  })



  let findedIsle = islas.find((isl: Isla) => isl.id === isleStore.isle)

  islaSelect.value = findedIsle

  const params = new URLSearchParams(window.location.search);
  console.log(params)
  const isle = params.get('isla');

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



  //Comprobar si el usuario está en el canal unido

  let userInChannel = await userService.userInChannel(user.value?.id_telegram, islaSelect.value?.id)
  if (!userInChannel.data) {
    window.Telegram.WebApp.showConfirm(
      `Para poder enviar alertas necesitas unirte al canal de ${islaSelect.value?.isla}.\n¿Quieres unirte?`,
      async (confirm) => {
        if (confirm) {
          // Abre el canal de Telegram en una nueva ventana o pestaña
          const canalUrl = islaSelect.value?.url;
          window.open(canalUrl, "_blank");
          window.Telegram.WebApp.close();

        } else {
          // Cierra la WebApp si el usuario cancela
          window.Telegram.WebApp.close();
        }
      }
    );
  }



}



</script>
<style scoped>
main {
  padding: 1rem;

}

.msg {
  text-align: center;
}

h3 {
  margin: 0;
  font-size: 2rem;
}

#alerta {


  margin: 1em 0;
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