<template>
    <main>
        <h2>Camaras de Tráfico</h2>

        <section id="camaras">
            <div v-for="camara in camaras" :key="camara.id">

                <ObjetCamaraVue :camara="camara" />
            </div>
        </section>

    </main>
</template>

<script lang="ts" setup>
import ObjetCamaraVue from '@/components/bot/ObjetCamara.vue';
import camaras from '@/camaras.json'
import('../../assets/basebot.css');


</script>
<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
    h2{
        font-size: 2.5rem;
        margin: 1rem;
    }
   

   
}
</style>