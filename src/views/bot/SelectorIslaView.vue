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
import { onMounted, ref } from 'vue';
import * as userService from '@/services/user'
import * as islaService from '@/services/isla'
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
    if (islaSelected && userFromDb.value?._id) await islaService.saveFavoriteIsle(islaSelected.id, userFromDb.value._id)
    window.Telegram.WebApp.MainButton.hide()
    router.push({ name: 'bot' });
}
onMounted(async () => {

    //Reset - Es necesario ya que vue guarda una caché, cuando se va para atrás y se vuelve a entrar se seleccionarían
    // los 2 el del usuario y el previamente sseleccionado
    islas.value.forEach((isla: Isla) => {
        isla.select = false
    })

    let dataUser = window.Telegram.WebApp.initDataUnsafe.user
    if(!dataUser) return
    let user = await userService.getUserFromIdTelegram(dataUser.id )
    userFromDb.value = user.data
    //Autoseleccionar isla si el usuario tenía ya una seleccionada
    let findedIsle = islas.value.find((isla) => isla.id == userFromDb.value?.favorite_isle)
    if (findedIsle) findedIsle.select = true

    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setText('Seleccionar Isla')
    var elemento = document.body;

    // Obtén el valor de la variable CSS personalizada
    var estilo = window.getComputedStyle(elemento);
    var valorVariable = estilo.getPropertyValue('--tg-theme-button-color');
    window.Telegram.WebApp.MainButton.setParams({
        color: valorVariable
    })
    window.Telegram.WebApp.MainButton.onClick(async () => {
        window.Telegram.WebApp.showConfirm(`Se guardará la isla como favorita, para cambiarlo tendrás que ir a los ajustes en el menú del bot`, ((confirm) => {
            if (confirm) {
                saveIsla()
            }
        }))


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