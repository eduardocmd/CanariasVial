<template>
    <aside>

        <ul>
            <RouterLink class="links" v-for="(site) in sitemap " :key="site.name" :to="{ name: site.name }">
                <li :title="site.name" :class="{ 'selected': site.name === currentRouteName }">
                    <div class="fill"></div>
                    <component :is="Icono(site.name)" />
                </li>
            </RouterLink>
        </ul>
    </aside>
</template>
<style scoped>
aside {
    position: fixed;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    height: var(--menu-size);
    bottom: 0;
    background-color: var(--color-background-soft);
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    padding: 1rem;


}

ul {
    position: relative;

    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0;
    align-items: center;
    margin: 0;
    list-style: none;




}

li {
    display: flex;
    align-items: center;

}

svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--color-text);
    z-index: 1;

}

li {
    position: relative;
    padding: 0.5rem 2rem;
    box-sizing: border-box;

}

.fill {
    border-radius: 5rem;
    position: absolute;
    top: 0;
    opacity: 0;
    left: 50%;
    /* Posicionado en el centro */
    transform: translateX(-50%);
    /* Centrado horizontalmente */
    height: 100%;
    width: 40%;
    background-color: var(--color-hint);
    z-index: 0;
    transition: all 0.3s ease;

    /* Transición solo en el ancho */
}


li.selected .fill {

    width: 100%;
    opacity: 1;
}





@media screen and (min-width: 768px) {
    aside {
        position: fixed;
        display: flex;

        background-color: transparent;
        align-items: center;
        top: 0;
        left: 0;
        transform: translateX(0);
        height: calc(100vh);

        width: var(--menu-size);


    }

    ul {

        height: 70%;
        align-items: center;

        flex-direction: column;
    }





    svg {
        width: 2.5rem;
        height: 2.5rem;



    }





}
</style>
<script setup lang="ts">

import { computed } from 'vue';
import Home from '@/components/icons/HomeIcon.vue'
import About from '@/components/icons/AboutIcon.vue'
import Alerta from '@/components/icons/AlertaIcon.vue'
import { useRoute } from 'vue-router';
import sitemap from '@/router/sitemap.json'
const currentRoute = useRoute();
const currentRouteName = computed(() => {
    return currentRoute.name || '/';
});

const Icono: any = (url: string) => {

    switch (url) {
        case 'home':
            return Home
        case 'alertas':
            return Alerta
        case 'about':
            return About
        default:
            return Home
    }

}



</script>
