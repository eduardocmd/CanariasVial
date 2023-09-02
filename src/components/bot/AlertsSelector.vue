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
  align-items: start;

  background-color:  var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);


}

#selector {
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem;
  background-color:  var(--tg-theme-bg-color);
}


.tipoalerta {

  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  margin: 0.4em;

  &:hover {
    transform: scale(1.2);

  }

}
</style>