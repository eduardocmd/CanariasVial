<template>
  <main class="alertas">
    <section class="alerta" v-for="alerta in alertas" :key="alerta._id" :class="alerta.tipo_alerta">
      <div class="data">
        <h3>{{ alerta.alerta }}</h3>
      </div>
      <p class="fecha">{{ fecha(alerta) }} {{ alerta.tipo_alerta }}</p>
    </section>
  </main>
</template>

<style scoped>
.alertas {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 1.5rem;

}

/* Estilo base de las alertas */

.alerta {
  border-radius: 1.5rem;

  display: flex;
  flex-direction: column; /* Asegura que el contenido fluya de arriba hacia abajo */
  word-wrap: break-word; /* Rompe las palabras largas */
  overflow-wrap: break-word; /* Asegura que el texto se ajuste bien */
  box-sizing: border-box;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #592d00;
}

.data h3 {
  word-break: break-word; /* Rompe palabras muy largas si es necesario */
  overflow: hidden; /* Evita que el texto desborde el contenedor */
  text-overflow: ellipsis; /* Opcional: añade puntos suspensivos si el texto es muy largo */
}


/* Colores dinámicos según el tipo de alerta */
.alerta{
  background-color: #592d00;
}

.alerta.accidente {
  background-color: #e63946; /* Rojo para accidentes */
}
.alerta.obras {
  background-color: #ffba08; /* Amarillo para obras */
}
.alerta.retenciones {
  background-color: #8a4fff; /* Verde para tráfico fluido */
}
.alerta.obstaculos {
  background-color: #184b7a; /* Naranja para obstáculos */
}
.alerta.viacortada{
  background-color: #ff7e33;
}

/* Estilo de los datos */
.data {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}



.alerta-image {
  width: 60px;
  height: 60px;
}

.fecha {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #ddd;
}

@media screen and (min-width: 768px) {
  .alertas {
    width: 600px;
    margin: auto;
    max-height: 80vh;
    overflow-y: auto;
    background-color: var(--color-background-soft);
  }
  
}
</style>

<script lang="ts" setup>
import alertasJSON from '@/alertas.json';

import type { AlertaType } from '@/models/Alerts';
import { getAlertas } from '@/services/alertas';
import { ref, onMounted } from "vue";

const alertas = ref<Array<AlertaType>>();

onMounted(async () => {
  alertas.value = (await getAlertas()).data;
});

const getImagen = (tipoAlerta: string): string => {
  const tipo = alertasJSON.find((tipos) => tipos.tipo == tipoAlerta);
  return tipo ? tipo.image : '';
};

const fecha = (alerta: AlertaType) => {
  if (!alerta.date_creation) return;
  const fecha = new Date(alerta.date_creation);
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const año = fecha.getUTCFullYear();
  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();

  const formatoDia = dia < 10 ? `0${dia}` : dia;
  const formatoMes = mes < 10 ? `0${mes}` : mes;
  const formatoHoras = horas < 10 ? `0${horas}` : horas;
  const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;

  return ` ${formatoHoras}:${formatoMinutos} ${formatoDia}/${formatoMes}/${año}`;
};
</script>
