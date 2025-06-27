<template>
    <main>
        <section v-for="isla in islas" @click="selectIsle(isla)" :class="{ 'selected': isla.select }" :key="isla.isla">
            <div class="isla" :style="{ 'background-image': 'url(' + baseurl + isla.image + ')' }">
            </div>
            <h2>{{ isla.isla }}</h2>
        </section>
        <div class="space"></div>
    </main>
</template>

<script lang="ts" setup>
import type { Isla } from '@/models/Isla';
import { useIsleStore } from '@/stores/isle';
import { ref } from 'vue';
import listaIslas from "@/islas.json"
// Instanciamos el store
const isleStore = useIsleStore()
const baseurl = import.meta.env.BASE_URL
const islas = ref<Isla[]>(listaIslas);

const selectIsle = (isla: Isla) => {

    isleStore.setIsle(isla.id)

}
</script>
<style scoped>
h2 {
    margin: 0;
}



main section {

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1rem;

    &:hover {
        transform: scale(1.2);
        background-color: var(--color-hint);
    }


}

section h2 {
    width: 100%;
    text-align: center;
}

.isla {

    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    cursor: pointer;
    margin: 0.4em;



}

.selected {
    transition: background-color 0.5s ease;
    background-color: var(--color-hint);
}
</style>