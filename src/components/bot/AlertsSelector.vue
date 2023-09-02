<script lang="ts" setup>
import accidenteImage from '@/assets/tiposalertas/accidente.svg';
import obras from '@/assets/tiposalertas/obras.svg';
import retenciones from '@/assets/tiposalertas/retenciones.svg';
import viacortada from '@/assets/tiposalertas/viacortada.svg'
import otro from '@/assets/tiposalertas/otro.svg';
import { RouterLink } from 'vue-router';
const selectores = [
  {
    tipo: 'accidente',
    image: accidenteImage
  },
  {
    tipo: 'obras',
    image: obras
  },
  {
    tipo: 'viacortada',
    image: viacortada
  },
  {
    tipo: 'retenciones',
    image: retenciones
  },
  {
    tipo: 'otro',
    image: otro
  }
]
</script>
<template>
  <main>
    <h2>Selecciona un tipo de alerta</h2>
    <section id="selector">
      <RouterLink v-for="selector in selectores" :key="selector.tipo" to="{path: '/bot/' + selector.tipo}">
        <div class="tipoalerta" :style="{ 'background-image': 'url(' + selector.image + ')' }"></div>
      </RouterLink>
    </section>
  </main>
</template>
    
<style scoped >

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

#selector {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  background-color: var(--color-background);
}


.tipoalerta {

  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  margin: 0.2em;

  &:hover {
    transform: scale(1.2);

  }

}
</style>