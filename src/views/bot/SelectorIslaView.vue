<template>
    <main>
       Isla Seleccionada:  {{ islaSelect?.isla }}
        <section v-for="isla in islas" @click="selectIsle(isla)" :class="{ 'selected': isla.select }" :key="isla.isla">
            <div class="isla" :style="{ 'background-image': 'url(' + isla.image + ')' }"></div>
            <h2>{{ isla.isla }}</h2>
        </section>
        <div class="space"></div>
    </main>
</template>
<script setup lang="ts">
export interface Isla {
    id: String;
    isla: string;
    image: string;
    select: boolean;
}
import { onMounted, ref } from 'vue';
import * as api_request from "@/api_request"
import listaIslas from "@/islas.json"
import router from '@/router';
const islas = ref<Isla[]>(listaIslas);
const islaSelect = ref<Isla>();
const selectIsle = (selectedIsla: Isla) => {

    islaSelect.value = selectedIsla
    islas.value.forEach((isla: Isla) => {
        isla.select = isla === selectedIsla



    });


}

onMounted(async () => {
    
   //Reseteo
   islas.value.forEach((isla: Isla) => {
        isla.select = false
    });
    islaSelect.value = undefined
    let dataUser = window.Telegram.WebApp.initDataUnsafe.user
    let userFromDb = await api_request.getUserFromIdTelegram(dataUser, window.Telegram.WebApp.initData)
  
    let islaPreselect = islas.value.find((isla : Isla) => isla.id == userFromDb.data.favorite_isle )
   if(islaPreselect){
    islaPreselect.select = true
    islaSelect.value =  islaPreselect
   }
 
    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setText('Seleccionar Isla')

    window.Telegram.WebApp.MainButton.setParams({
        color: "#213fff"
    })
    window.Telegram.WebApp.MainButton.onClick(() => {
        //Methods
        if (islaSelect.value) {
            window.Telegram.WebApp.showConfirm(`Se guardará la isla como favorita, para cambiarlo tendrás que ir a los ajustes en el menú del bot`, ((confirm) => {
                if (confirm) {
                    window.Telegram.WebApp.MainButton.hide()
                    router.push({ name: 'bot'});
                }
            }))
        }else{
            window.Telegram.WebApp.showAlert("Necesitas selecionar una isla primero")
        }
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