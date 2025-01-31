<template>
  <main class="alertas">
    <section class="alerta" v-for="alerta in alertas" :key="alerta._id" :class="alerta.tipo_alerta">
      <div class="data">
        <img class="alerta-image" :src="getImagen(alerta.tipo_alerta)" alt="Imagen de la alerta" />
        <h3>{{ alerta.alerta }}</h3>
      </div>
      <p class="fecha">{{ fecha(alerta) }}</p>
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
}

/* Estilo base de las alertas */
.alerta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Colores dinámicos según el tipo de alerta */
.alerta.accidente {
  background-color: #e63946; /* Rojo para accidentes */
}
.alerta.obras {
  background-color: #ffba08; /* Amarillo para obras */
}
.alerta.fluidez {
  background-color: #2a9d8f; /* Verde para tráfico fluido */
}

/* Estilo de los datos */
.data {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.data h3 {
  font-size: 1.3rem;
  margin: 0;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
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
