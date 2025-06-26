<template>
    <header>

        <div id="logo" :style="{ 'background-image': 'url(./logo.png)' }"></div>
        <div id="header-text">
            <h1>Canarias Vial</h1>
            <h2>{{ isleStore.isle }}</h2>
            <label class="switch">
                <input type="checkbox" v-model="activo" />
                <span class="slider"></span>
            </label>

            <p>Estado: {{ activo ? 'Activado ✅' : 'Desactivado ❌' }}</p>
        </div>

    </header>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useIsleStore } from '@/stores/isle'
import { watch } from 'vue';


// Instanciamos el store
const isleStore = useIsleStore()
const activo = ref(false)

watch(activo, (nuevoValor) => {
    const newisle = nuevoValor ? 'tnf' : 'lpgc'
    isleStore.setIsle(newisle)
})

</script>
<style scoped>
header {
    font-family: Norwester;
    background-color: var(--color-background-soft);
    overflow: hidden;
    display: flex;
    position: relative;

    align-items: center;
    padding: 0.5rem;
    max-width: 100%;


}

#header-text {
    margin: auto;
    text-align: center;
}


#header-text h2 {
    color: var(--color-primary);
}



#header-text h2,
h1 {

    margin: 0;
}





#logo {
    height: 60px;
    width: 60px;
    background-size: 100%;
    background-position: bottom center;
    background-color: var(--color-background);
    border-radius: 50%;
    background-repeat: no-repeat;
    flex-shrink: 0;
    position: absolute;

}

.switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 26px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* Slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

/* Círculo */
.slider::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

/* ON */
input:checked+.slider {
    background-color: #3dc1ff;
    /* color tipo Telegram */
}

input:checked+.slider::before {
    transform: translateX(20px);
}

@media screen and (min-width: 768px) {
    #logo {
        width: 100px;
        height: 100px;

    }

    header {
        position: fixed;
        background-color: transparent;
        top: 0;
        max-height: var(--menu-size);
        width: 100%;
        left: 0;
        z-index: 1;





    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 1.5rem;
    }

}
</style>