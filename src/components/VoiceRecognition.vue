<template>
    <!-- Botón de micrófono -->
    <MainButtton id="micro" valueText="🎤" @click="toggleRecognition" :disabled="recognitionActive" />

    <p v-if="recognitionActive" style="margin: 0 ; color: green;">🎙️ Reconociendo...</p>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MainButtton from './assets/mainButtton.vue';
defineProps(['text'])

const recognitionActive = ref(false); // Indica si el micrófono está activo
let recognition: any; // Objeto de reconocimiento de voz
const transcript = ref(""); // Contenido transcrito


const emit = defineEmits<{
    (event: "transcriptText", tipo: string): void;
}>();

// Configuración del reconocimiento de voz
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = "es-ES"; // Idioma español
    recognition.continuous = false; // Continuar sin detenerse
    recognition.interimResults = false; // Solo resultados finales

    // Manejo de los resultados
    recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1][0].transcript;
        emit('transcriptText', result + " ")

    };

    recognition.onerror = (event: any) => {
        console.error("Error en el reconocimiento:", event.error);
        recognitionActive.value = false;
    };

    recognition.onend = () => {
        recognitionActive.value = false; // Detener reconocimiento
    };
}

// Función para iniciar/detener el reconocimiento
const toggleRecognition = () => {
    if (recognitionActive.value) {
        recognition.stop();
    } else {
        recognition.start();
        recognitionActive.value = true;
    }
};
</script>
<style scoped>
#micro {

    bottom: 20px;
    right: 10px;
    z-index: 100;
}
</style>