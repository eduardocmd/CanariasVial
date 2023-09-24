<template>
 <section v-if="availableAlert" id="datosAlerta">
  <h2>Alerta - {{ ruta }}</h2>
  <textarea v-model="alerta" placeholder="Introduce la alerta" id="alerta" rows="1" type="text"
    style="overflow: hidden; overflow-wrap: break-word; "></textarea>
 </section>
 <section v-else id="salidaAlerta">
<h1 class="msg">{{ msgResponse }}</h1>
<p>La alerta: {{ alerta }} ha sido publicada con éxito</p>
 </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as api_request from "@/api_request"
import { useRoute } from "vue-router";
import alertasJSON from "@/alertas.json"
import { sendAlert } from "@/api_request"
import type{AlertaType} from '@/models/Alerts'
import type{UserType} from '@/models/TelegramUser'
import islas from '@/islas.json'
import type{ Isla } from "@/models/Isla"


// Obtén la información de la ruta actual
const route = useRoute();
const ruta = ref()
const islaSelect = ref()
const user = ref<UserType>()
ruta.value = route.params.tipo
const alerta = ref('')
//Si no está disponible
const availableAlert = ref(true)
//Mensaje 
const msgResponse = ref('')
onMounted(async() => {
  alerta.value = ''
 let response = await api_request.getUserFromIdTelegram(window.Telegram.WebApp.initDataUnsafe.user, window.Telegram.WebApp.initData)
 user.value = response.data 

   //Ver para que isla va a ser la alerta.
   if (window.Telegram.WebApp.initDataUnsafe.start_param) {
    //Sacará la isla si la webapp se inició desde algún canal (Cada isla tiene un canal y grupo de difusión)
    //api_request.IslefromInstance(window.Telegram.WebApp)

    //De momento se queda igual:     

    let findedIsle = islas.find((isl : Isla) => isl.id === window.Telegram.WebApp.initDataUnsafe.start_param)
  if(findedIsle)  {
    islaSelect.value = findedIsle
    return
  }

  } 


   if(user.value ){
    let idIslaUsuario = user.value.favorite_isle
 let findedIsle = islas.find((isl : Isla) => isl.id === idIslaUsuario)
   if(findedIsle)   islaSelect.value = findedIsle
   }



})
window.Telegram.WebApp.setHeaderColor("bg_color")
window.Telegram.WebApp.BackButton.show()
window.Telegram.WebApp.MainButton.show()
window.Telegram.WebApp.MainButton.setText('Enviar Alerta')
let alertaF = alertasJSON.filter((alerta) => alerta.tipo === ruta.value)

window.Telegram.WebApp.MainButton.setParams({
  color: alertaF[0].color
})
window.Telegram.WebApp.MainButton.onClick(async () => {
  //Methods
  if (alerta.value) {
    window.Telegram.WebApp.MainButton.disable()
    window.Telegram.WebApp.MainButton.showProgress()
    let tipoAlerta : string =  Array.isArray( route.params.tipo) ?  route.params.tipo[0] :  route.params.tipo
    if(!user.value?._id) return
    let nuevalerta : AlertaType = {
      _id: '',
      isla: islaSelect.value.id,
      alerta: alerta.value,
      id_usuario: user.value?._id,
      tipo_alerta: tipoAlerta
    }
   if(!window.Telegram.WebApp.initDataUnsafe.user) return
   let sendedAlert  =  await sendAlert(nuevalerta,  window.Telegram.WebApp.initData, window.Telegram.WebApp.initDataUnsafe.user)

    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.MainButton.hideProgress()
    window.Telegram.WebApp.MainButton.enable()
    availableAlert.value = false
    msgResponse.value = sendedAlert.data
    //if(salida.status === 200) window.Telegram.WebApp.MainButton.hide()

  }

});


</script>
<style scoped>
.msg{
  text-align: center;
}
#alerta {

  min-height: 200px;
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
  border-radius: 1rem;
  resize: none;
  color: var(--text-color);
  background: var(--color-background);
  -webkit-user-select: auto;
  user-select: auto;
  cursor: auto;
  width: 100%;
}
</style>