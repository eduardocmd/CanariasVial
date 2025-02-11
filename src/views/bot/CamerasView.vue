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
import { onMounted } from 'vue';
import('../../assets/basebot.css');
import router from '@/router'

onMounted(() => {
    window.Telegram.WebApp.ready()

    window.Telegram.WebApp.BackButton.show()


    window.Telegram.WebApp.BackButton.onClick(() => {

        router.push({ name: 'bot' });
        window.Telegram.WebApp.BackButton.hide()
        window.Telegram.WebApp.MainButton.hide()
    })

    window.Telegram.WebApp.setHeaderColor("bg_color")
})


</script>
<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 2.5rem;
        margin: 1rem;
    }



}
</style>