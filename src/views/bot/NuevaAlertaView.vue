<template>
    <h2>Alerta - {{ ruta }}</h2>
   
    <textarea placeholder="Introduce la alerta" id="alerta" :value='alerta'  rows="1" type="text" style="overflow: hidden; overflow-wrap: break-word; "></textarea>


</template>

<script setup lang="ts">
import { ref } from "vue";
import {  useRoute } from "vue-router";
import alertasJSON from "@/alertas.json"


// Obtén la información de la ruta actual
const route = useRoute();

const ruta = ref()
ruta.value = route.params.tipo
const alerta = ref()
window.Telegram.WebApp.setHeaderColor("bg_color")
window.Telegram.WebApp.BackButton.show()
window.Telegram.WebApp.MainButton.show()
window.Telegram.WebApp.MainButton.setText('Enviar Alerta') 
let alertaF =   alertasJSON.filter((alerta) => alerta.tipo === ruta.value)

     window.Telegram.WebApp.MainButton.setParams({
            color: alertaF[0].color 
         })
       window.Telegram.WebApp.MainButton.onClick(() => {
       //Methods
     });


</script>
<style scoped>

#alerta{

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
background: var( --color-background);
-webkit-user-select: auto;
user-select: auto;
cursor: auto;
width: 100%;
}
</style>