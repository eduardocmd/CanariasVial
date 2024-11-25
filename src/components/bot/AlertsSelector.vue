<template>
  <main>
    <section id="selector" >
      <div
        v-for="selector in selectores"
        :key="selector.tipo"
        class="tipoalerta"
        :style="{ backgroundColor: selectedTipo.tipo === selector.tipo ? selector.color : 'transparent' }"
        @click="select(selector)"
      >
        {{ selector.tipo }}
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
interface Selector {
  tipo: string;
  icono: string;
  color: string;
  image: string;
}

// Importar y tipar los datos de alertas.json
import rawSelectores from "@/alertas.json";
const selectores: Selector[] = rawSelectores as Selector[];

import { ref, type Ref } from "vue";


const selectedTipo = ref<any>("");

const select = (selector: any) => {
  selectedTipo.value = selector;
  emit("alertaSeleccionada", selectedTipo);
};



const emit = defineEmits<{
  (event: "alertaSeleccionada", tipo: Ref): void;
}>();
</script>
<style scoped>

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  background-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
}

#selector {
  width: 300px; /* Define un ancho fijo o ajustable */
  height: 180px; /* Define la altura del contenedor para el desplazamiento */
  overflow: auto; 
  display: flex;
  flex-direction: column; /* Asegura que los elementos se alineen verticalmente */
  padding: 10px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 10px;
  
  transition: transform 0.3s ease;
}




.tipoalerta {

  margin: 3px 0;
  text-align: center;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  font-size: 1.2rem;

  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tipoalerta:hover {
  background-color: rgba(0, 0, 255, 0.3);
}
</style>