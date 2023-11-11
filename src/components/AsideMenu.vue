<template>
    <aside>

        <ul>
            <RouterLink v-for="(site) in sitemap " :key="site.name" :to="{ name: site.name }">
                <li :class="{ 'selected': site.name === currentRouteName }" >
                    img
              
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

    padding: 1rem;


    ul {
        position: relative;

        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 0;
        align-items: center;
        margin: 0;
        list-style: none;


        li {
            padding: 0.5rem 2rem;
            border-radius: 5rem;
            display: flex;

            align-items: center;

            svg {
                width: 20px;
                height: 20px;
                fill: var(--color-text);

            }

        }

    }

    li.selected {
        background-color: var(--color-primary);

    }

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

        ul {

            height: 70%;
            align-items: center;

            flex-direction: column;

            li {
           

            svg {
                width: 40px;
                height: 40px;
             

            }

        }
        }
    }



}
</style>
<script setup lang="ts">
import { computed } from 'vue';

import { useRoute } from 'vue-router';
import sitemap from '@/router/sitemap.json'
const currentRoute = useRoute();
const currentRouteName = computed(() => {
    return currentRoute.name || '/';
});



</script>
