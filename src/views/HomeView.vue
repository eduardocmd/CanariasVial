<script setup lang="ts">

import MapaAlertas from '@/components/MapaAlertas.vue';


</script>

<template>
  <main>
    <h2>Bienvenido a la web de <span class="title">Canarias Vial</span></h2>

    <div class="d-flex">
      <a href="https://t.me/+6cbnkbEqc4ZjMWNk" target="_blank">
        <p class="enlaces">
          Chat oficial
          <img class="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
            alt="" />
        </p>
      </a>
      <a href="https://t.me/+e9VvKdtdrPRiMjJk" target="_blank">
        <p class="enlaces">
          Alertas canal
          <img class="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
            alt="" />
        </p>
      </a>
    </div>

    <MapaAlertas />
  </main>
</template>

<style scoped>
h1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>