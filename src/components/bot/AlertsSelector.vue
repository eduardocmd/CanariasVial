<script lang="ts" setup>
import accidenteImage from '@/assets/tiposalertas/accidente.svg';
import obras from '@/assets/tiposalertas/obras.svg';
import retenciones from '@/assets/tiposalertas/retenciones.svg';
import viacortada from '@/assets/tiposalertas/viacortada.svg'
import otro from '@/assets/tiposalertas/otro.svg';
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

  <div class="tipoalerta" v-for="selector in selectores" :key="selector.tipo" :style="{ 'background-image': 'url(' + selector.image + ')' }"></div>
  </main>
</template>
    

    
<style scoped >
  .tipoalerta{

width: 100px;
height: 100px;
background-repeat: no-repeat;
background-size: contain;
background-position: center center ;
border-radius: 1em;
cursor: pointer;
margin: 0.4em;
&:hover{
  transform: scale(1.2);

}

}
</style>