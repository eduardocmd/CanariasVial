<template>
    <div id="camara">
        <div id="icono" alt=""></div>
        <h2>{{ camara?.nombre }}</h2>
        <!--   <span  v-if="!loade" class="loader"></span> -->
        <img :src="camara?.url" alt="">
        <button @click="downloadAndSendImage">Descargar</button>
    </div>

</template>
<script lang="ts" setup>
import type { CamaraType } from '@/models/Camara';
const props = defineProps<{
    camara?: CamaraType | null
}>()


const downloadAndSendImage = () => {

    // Descarga la imagen
    window.Telegram.WebApp.downloadFile({
        file_name: props.camara?.nombre + '.jpg',
        url: props.camara?.url || ''
    }, (res) => {
        // Envía la imagen
        window.Telegram.WebApp.sendData({
            file: res,
            data: res,
            mime_type: 'image/jpeg',
            caption: 'Imagen de la cámara ' + props.camara?.nombre
        })
    })
}


</script>
<style scoped>
#enviar {
    cursor: pointer;
}

#camara {
    background-color: var(--tg-theme-secondary-bg-color);
    margin: 1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    box-sizing: border-box;

}

#camara img {
    width: 100%;
    border-radius: 1em;
}

#icono {

    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: var(--tg-theme-text-color);
    mask-image: url('../assets/camara.svg');
    mask-repeat: no-repeat;


}

#icono:hover {
    background-color: var(--tg-theme-button-color);

}
</style>