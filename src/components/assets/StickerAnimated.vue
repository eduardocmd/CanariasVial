<template>
    <div ref="stickerContainer" :style="{ width: size + 'px', height: size + 'px' }"></div>
  </template>
  
  <script>
  import lottie from "lottie-web";
  
  export default {
    name: "AnimatedSticker",
    props: {
      stickerPath: {
        type: String,
        required: true, // Ruta al archivo JSON del sticker animado
      },
      size: {
        type: Number,
        default: 200, // Tamaño por defecto del sticker
      },
      loop: {
        type: Boolean,
        default: true, // Repetir animación por defecto
      },
      autoplay: {
        type: Boolean,
        default: true, // Reproducir automáticamente
      },
    },
    mounted() {
      // Carga y renderiza la animación
      lottie.loadAnimation({
        container: this.$refs.stickerContainer, // Contenedor donde se mostrará
        renderer: "canvas", // Renderiza en <canvas>
        loop: this.loop,
        autoplay: this.autoplay,
        path: this.stickerPath, // Ruta al archivo JSON
      });
    },
  };
  </script>
  
  <style scoped>
  /* Ajusta estilos si es necesario */
  </style>
  