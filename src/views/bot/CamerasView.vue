<template>
<h2>Camaras de Tráfico</h2>


    <section id="camaras">
    <div v-for="camara in camaras" :key="camara.id" >
       
     <ObjetCamaraVue   :camara="camara"/>
    </div>
    </section>

</template>

<script lang="ts" setup>
import ObjetCamaraVue from '@/components/bot/ObjetCamara.vue';
import camaras from '@/camaras.json'



</script>
<style lang="scss" scoped>



</style>