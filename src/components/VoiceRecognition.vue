<template>
    <!-- Botón de micrófono -->
    <button @click="toggleRecognition" :disabled="recognitionActive" style="
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #0088cc; /* Color de Telegram */
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          cursor: pointer;
        ">
        🎤
    </button>

    <p v-if="recognitionActive" style="margin-top: 10px; color: green;">🎙️ Reconociendo...</p>
</template>
<script setup lang="ts">
import { ref } from 'vue';
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