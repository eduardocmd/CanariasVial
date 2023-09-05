<template>
    <h2>NuevaAlerta</h2>
    <p>{{ ruta }}</p>

    {{ data }}
</template>

<script setup lang="ts">
import { ref } from "vue";
import {  useRoute } from "vue-router";
import alertasJSON from "@/alertas.json"


// Obtén la información de la ruta actual
const route = useRoute();
const data = alertasJSON
const ruta = ref()
ruta.value = route.params.tipo

window.Telegram.WebApp.BackButton.show()
window.Telegram.WebApp.MainButton.show()
window.Telegram.WebApp.MainButton.setText('Enviar Alerta') 
let alerta =   alertasJSON.filter((alerta) => alerta.tipo === ruta.value)

     window.Telegram.WebApp.MainButton.setParams({
            color: alerta[0].color 
         })
       window.Telegram.WebApp.MainButton.onClick(() => {
       //Methods
     });


</script>