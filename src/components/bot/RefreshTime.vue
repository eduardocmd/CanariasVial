<template>
    <section v-if="!loading">
        <h1 class="msg"> No puedes enviar alertas en menos de 5m.Tiempo restante: {{ remainingTime }}</h1>
        <div class="clock"></div>

        <RouterLink :to="{ name: 'bot' }">
            <mainButtton valueText="Ir al inicio" />
        </RouterLink>
    </section>
    <section v-else>

    </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as alertService from '@/services/alertas'
import mainButtton from '@/components/assets/mainButtton.vue';
const loading = ref(false)
const props = defineProps(['userId'])
const emit = defineEmits<{
    (event: "refreshTime", tipo: boolean): void;
}>();
const remainingTime = ref()
const Alert = ref()


onMounted(async () => {
    loading.value = true
    let responseisActive = await alertService.refreshTime(props.userId)

    if (responseisActive.status === 200) Alert.value = responseisActive.data
    if (Alert.value == '') emit("refreshTime", false);
    getSeconds(responseisActive)
    setInterval(() => {
        getSeconds(responseisActive)
    }, 1000)
    loading.value = false

})

const getSeconds = (responseisActive: any) => {
    let resto = new Date(responseisActive.data).getTime() - new Date().getTime() + 5 * 60 * 1000;
    if (Alert.value) remainingTime.value = `${Math.floor(resto / (1000 * 60))}m y ${Math.floor(resto / 1000) % 60}s`
    if (resto < 0) emit("refreshTime", false);
}

</script>
<style scoped>
.clock {
    border-radius: 70px;
    border: 6px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    display: block;
    width: 120px;
    height: 120px;
}

.clock:after {
    content: "";
    position: absolute;
    background-color: #fff;
    top: 13px;
    left: 48%;
    height: 50px;
    width: 6px;
    border-radius: 5px;
    -webkit-transform-origin: 50% 97%;
    transform-origin: 50% 97%;
    -webkit-animation: grdAiguille 2s linear infinite;
    animation: grdAiguille 2s linear infinite;
}

@-webkit-keyframes grdAiguille {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes grdAiguille {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.clock:before {
    content: "";
    position: absolute;
    background-color: #fff;
    top: 24px;
    left: 48%;
    height: 40px;
    width: 6px;
    border-radius: 5px;
    -webkit-transform-origin: 50% 94%;
    transform-origin: 50% 94%;
    -webkit-animation: ptAiguille 12s linear infinite;
    animation: ptAiguille 12s linear infinite;
}

@-webkit-keyframes ptAiguille {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes ptAiguille {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>