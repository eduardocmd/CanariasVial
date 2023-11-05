<template>
    <aside>
        <ul>
            <li>
                <HomeIcon />
            </li>
            <li>
                <HomeIcon />
            </li>
            <li>
                <HomeIcon />
            </li>
            <li>
                <HomeIcon />
            </li>
        </ul>
    </aside>
</template>
<style scoped>
aside {
    position: fixed;
    width:60%;
    overflow: hidden;

    height: var(--menu-size);
    bottom: 0;
    background-color: var(--color-background-soft);
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding: 1rem;


    ul {
        position: relative;

        display: flex;
        justify-content: space-between;
        width: 100%;

        padding: 0;
        align-items: center;
        margin: 0;
        list-style: none;


        li {

            display: flex;

            align-items: center;

            svg {
                width: 40px;
                height: 40px;
                fill: var(--color-text);

            }

        }





    }



}


@media screen and (min-width: 768px) {
    aside {
        position: fixed;
        display: flex;
        align-items: end;
        background-color: transparent;

        top: 0;
        left: 0;
        transform: translateX(0);
        height: calc(100vh);
        width: var(--menu-size);


    }
}
</style>
<script setup lang="ts">
import HomeIcon from './icons/HomeIcon.vue';

</script>