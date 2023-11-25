<template>
  <main class="alertas">

    <section class="alerta" v-for="alerta in alertas" :key="alerta._id">

      <img class="alerta-image" :src="getImagen(alerta.tipo_alerta)" alt="Imagen de la alerta" />
      <h3> {{ alerta.alerta }} </h3>
      <p>{{ fecha(alerta) }}</p>



    </section>
  </main>
</template>
<style scoped>
.alerta-image {
  width: 80px;
  height: 80px;
  margin-right: 2rem;
}

.alerta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: bold;
  border-radius: 2rem;
  width: 80%;
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  p{
    margin: 0 2rem;
  }
}
</style>
<script lang="ts" setup>
import alertasJSON from '@/alertas.json'

import type { AlertaType } from '@/models/Alerts';
import { getAlertas } from '@/services/alertas';
import { ref, onMounted } from "vue"

const alertas = ref<Array<AlertaType>>();

onMounted(async () => {
  alertas.value = (await getAlertas()).data

})

const getImagen = (tipoAlerta: string): string => {
  let tipo = alertasJSON.find((tipos) => tipos.tipo == tipoAlerta)
  return tipo ? tipo.image : '';

}
const fecha = (alerta: AlertaType) => {
  if(!alerta.date_creation) return
  const fecha = new Date(alerta.date_creation)
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
  const año = fecha.getUTCFullYear();
  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();

  // Asegurarse de que los componentes tengan dos dígitos
  const formatoDia = dia < 10 ? `0${dia}` : dia;
  const formatoMes = mes < 10 ? `0${mes}` : mes;
  const formatoHoras = horas < 10 ? `0${horas}` : horas;
  const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;

  // Construir la cadena de fecha formateada
  const fechaFormateada = `${formatoDia}/${formatoMes}/${año} ${formatoHoras}:${formatoMinutos}`;

  return fechaFormateada;
}

</script>

