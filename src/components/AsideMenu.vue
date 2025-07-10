<template>
    <aside>

        <ul>
            <RouterLink class="links" v-for="(site) in sitemap" :key="site.name" :to="{ name: site.name }">
                <li :title="site.name"
                    :class="{ 'selected': (currentRoute.path.includes(site.name)) || (currentRoute.path === '/' && site.name === 'home') }">
                    <div class="fill"></div>
                    <div class="icons" :style="{
                        WebkitMaskImage: `url(${getLogo(site.filename)})`,
                        maskImage: `url(${getLogo(site.filename)})`,
                    }"></div>


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
    height: var(--aside-size);
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
    padding: 0.5rem 1.2rem;
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

.icons {
    width: 28px;
    height: 28px;

    /* Color que tendrá el icono */
    background-color: var(--color-text);
    background-size: contain;
    background-position: center;

    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;

    display: inline-block;
}

.logo {
    width: 30px;
    height: 30px;

    box-shadow: 10px 0px 39px -2px rgba(0, 0, 0, 0.33);
    -webkit-box-shadow: 10px 0px 39px -2px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: 10px 0px 39px -2px rgba(0, 0, 0, 0.33);
    background-color: transparent;
    background-size: contain;
    background-position: center;

    z-index: 1;
    display: inline-block;

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
        width: var(--aside-size);


    }

    ul {

        height: 70%;
        align-items: center;
        flex-direction: column;
    }


}
</style>
<script setup lang="ts">

import { computed } from 'vue';

import { useRoute } from 'vue-router';



const sitemap = [
    {
        "route": "/",
        "name": "home",
        "filename": "HomeIcon.svg"
    },
    {
        "route": "/alertas",
        "name": "alertas",
        "filename": "AlertIcon.svg"
    },

    {
        "route": "/about",
        "name": "about",
        "filename": "AboutIcon.svg"
    }

]
const currentRoute = useRoute();
const currentRouteName = computed(() => {
    return currentRoute.name || '/';
});

const getLogo = (filename: any) => {

    let url = `${import.meta.env.BASE_URL}icons/${filename}`
    console.log(url)
    return url
}



</script>
