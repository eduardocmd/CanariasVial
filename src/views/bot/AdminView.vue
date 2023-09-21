<template>
    <h2>Admin Menú</h2>
    <main>


        <div v-for="alerta in alertas" :key="alerta._id">

            <div class="box-alerta">
                <h2>Alerta {{ alerta.tipo_alerta }} </h2>
                <p>Alerta: {{ alerta.alerta }}</p>
                <p>IdUsuario: {{ alerta.id_usuario }}</p>
                <button @click="aceptarAlerta(alerta._id)">Aceptar</button> <button>Borrar</button>
                <p class="id-alerta">{{ alerta._id }}</p>
            </div>
          
        </div>
    </main>
</template>
<script lang="ts" setup>
import * as api_request from "@/api_request"
import type { AlertaType } from "@/models/Alerts";
import { onMounted, ref } from "vue";
const alertas = ref<Array<AlertaType>>()
    const aceptarAlerta = async (id: string) => {
       let response =  await api_request.acceptAlert(id, window.Telegram.WebApp.initData)
       if(response.status === 200) obtenerAlertas()
    }
onMounted(() => {

   obtenerAlertas()

})

const obtenerAlertas = async() => {
    let respuesta = await api_request.getAlerts('pending', window.Telegram.WebApp.initData, window.Telegram.WebApp.initDataUnsafe)
    alertas.value = respuesta.data
} 

</script>
<style scoped>
.id-alerta {
    text-align: right;
    font-size: 0.4rem;
}

.box-alerta {
    margin: 1rem 0.5rem;
    background-color: var(--color-background);
    padding: 2rem;
    border-radius: 1rem;
}
</style>