<template>
    <main>
        <section v-for="isla in islas" @click="selectIsle(isla)" :class="{ 'selected': isla.select }" :key="isla.isla">
            <div class="isla" :style="{ 'background-image': 'url(' + isla.image + ')' }"></div>
            <h2>{{ isla.isla }}</h2>
        </section>
        <div class="space"></div>
    </main>
</template>
<script setup lang="ts">

import { getCurrentInstance } from 'vue';
import { onMounted, ref } from 'vue';
import * as api_request from "@/api_request"
import listaIslas from "@/islas.json"
import router from '@/router';
//Models
import type { UserType } from '@/models/TelegramUser'
import type { Isla } from '@/models/Isla'
const islas = ref<Isla[]>(listaIslas);
const userFromDb = ref<UserType>();
const selectIsle = (selectedIsla: Isla) => {
    islas.value.forEach((isla: Isla) => {
        isla.select = isla === selectedIsla
    });
}
const saveIsla = async () => {

    let islaSelected = islas.value.find((i) => i.select === true)
   if(islaSelected && userFromDb.value?._id) await api_request.saveFavoriteIsle(islaSelected.id, window.Telegram.WebApp.initData, userFromDb.value._id)
    window.Telegram.WebApp.MainButton.hide()
    router.push({ name: 'bot' });
}

onMounted(async () => {

    //Reseteo
    const instance = getCurrentInstance();
    instance?.proxy?.$forceUpdate()

    let dataUser = window.Telegram.WebApp.initDataUnsafe.user
    let user = await api_request.getUserFromIdTelegram(dataUser, window.Telegram.WebApp.initData)
    userFromDb.value = user.data


    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setText('Seleccionar Isla')

    window.Telegram.WebApp.MainButton.setParams({
        color: "#213fff"
    })
    window.Telegram.WebApp.MainButton.onClick(async () => {
        saveIsla()

    });
})

</script>
<style scoped>
h2 {
    margin: 0;
}

main {
    background-color: var(--color-background-soft);


}

main section {
    background-color: var(--color-background);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;


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

    &:hover {
        transform: scale(1.2);

    }

}

.selected {
    transition: background-color 0.5s ease;
    background-color: var(--color-hint);
}
</style>