<template>
  <section v-if="!availableAlert" id="datosAlerta">
    <h2>Alerta - {{ ruta }}</h2>
    <textarea v-model="alerta" placeholder="Introduce la alerta" id="alerta" rows="1" type="text"
      style="overflow: hidden; overflow-wrap: break-word; "></textarea>
  </section>
  <section v-else id="salidaAlerta">
    <h1 class="msg">{{ msgResponse }}</h1>
    <div class="clock"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import alertasJSON from "@/alertas.json"
import { sendAlert } from "@/api_request"
import type { AlertaType } from '@/models/Alerts'
import type { UserType } from '@/models/TelegramUser'
import islas from '@/islas.json'
import type { Isla } from "@/models/Isla"
import * as userService from "@/services/user";
import * as alertService from "@/services/alertas"
import router from '@/router'
// Obtén la información de la ruta actual
const route = useRoute()
const ruta = ref()
const islaSelect = ref()
const user = ref<UserType>()
ruta.value = route.params.tipo
const alerta = ref('')
//Si no está disponible
const availableAlert = ref(false)
//Mensaje 
const msgResponse = ref('')
onMounted(async () => {
  window.Telegram.WebApp.BackButton.onClick(() => {

router.back()
window.Telegram.WebApp.BackButton.hide()
window.Telegram.WebApp.MainButton.hide()
})
  alerta.value = ''
  if(!window.Telegram.WebApp.initDataUnsafe.user) return
  let response = await userService.getUserFromIdTelegram(window.Telegram.WebApp.initDataUnsafe.user.id)
  user.value = response.data
  //Lo primero comprobar si tiene alertas pendientes de aceptar
  if (user.value) {
  
    let responseisActive = await alertService.pendingByUser(user.value?._id)
    if (responseisActive.status === 200) availableAlert.value = responseisActive.data
    //Si hay una alerta activa   
    
    let resto = new Date(responseisActive.data).getTime() - new Date().getTime() + 5 * 60 * 1000;
    if (availableAlert.value) msgResponse.value = `No puedes enviar alertas en menos de 5m.Tiempo restante: ${Math.floor(resto / (1000 * 60))}m y ${Math.floor(resto / 1000)  % 60}s`

    if (!availableAlert.value) {
      window.Telegram.WebApp.setHeaderColor("bg_color")
      window.Telegram.WebApp.BackButton.show()
      window.Telegram.WebApp.MainButton.show()
      window.Telegram.WebApp.MainButton.setText('Enviar Alerta')
      let alertaF = alertasJSON.filter((alerta) => alerta.tipo === ruta.value)
      window.Telegram.WebApp.MainButton.setParams({
        color: alertaF[0].color
      })
    }
 

  }
  //Ver para que isla va a ser la alerta.
  if (window.Telegram.WebApp.initDataUnsafe.start_param) {
    //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
    //api_request.IslefromInstance(window.Telegram.WebApp)
    //De momento se queda igual:     
    let findedIsle = islas.find((isl: Isla) => isl.id === window.Telegram.WebApp.initDataUnsafe.start_param)
    if (findedIsle) {
      islaSelect.value = findedIsle
      return
    }

  }
  if (user.value) {
    let idIslaUsuario = user.value.favorite_isle
    let findedIsle = islas.find((isl: Isla) => isl.id === idIslaUsuario)
    if (findedIsle) islaSelect.value = findedIsle
  }



})




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
    let sendedAlert = await sendAlert(nuevalerta, window.Telegram.WebApp.initData, window.Telegram.WebApp.initDataUnsafe.user)

    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.MainButton.hideProgress()
    window.Telegram.WebApp.MainButton.enable()
    availableAlert.value = false
    alerta.value = ''
    msgResponse.value = sendedAlert.data
    //if(salida.status === 200) window.Telegram.WebApp.MainButton.hide()

  }

});


</script>
<style scoped>
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
.clock{
	border-radius: 70px;
	border: 6px solid #fff;
	position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  display: block;
  width: 120px;
  height: 120px;
}

.clock:after{
	content: "";
	position: absolute;
	background-color: #fff;
	top: 13px;
	left: 48%;
	height: 50px;
	width: 6px;
	border-radius: 5px;
	-webkit-transform-origin: 50% 97%;
			transform-origin: 50% 97%;
	-webkit-animation: grdAiguille 2s linear infinite;
			animation: grdAiguille 2s linear infinite;
}

@-webkit-keyframes grdAiguille{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
}

@keyframes grdAiguille{
    0%{transform:rotate(0deg);}
    100%{transform:rotate(360deg);}
}

.clock:before{
	content: "";
	position: absolute;
	background-color: #fff;
	top: 24px;
	left: 48%;
	height: 40px;
	width: 6px;
	border-radius: 5px;
	-webkit-transform-origin: 50% 94%;
			transform-origin: 50% 94%;
	-webkit-animation: ptAiguille 12s linear infinite;
			animation: ptAiguille 12s linear infinite;
}

@-webkit-keyframes ptAiguille{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
}

@keyframes ptAiguille{
    0%{transform:rotate(0deg);}
    100%{transform:rotate(360deg);}
}
</style>