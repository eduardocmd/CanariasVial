<script setup lang="ts">

import AlertList from '@/components/AlertList.vue';
import MapaAlertas from '@/components/MapaAlertas.vue';


</script>

<template>
  <main>
    <div id="info">
      <MapaAlertas />
      <AlertList></AlertList>

    </div>
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
  </main>

</template>

<style scoped>
#info {

  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

}

.logo {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

@media screen and (min-width: 768px) {
  #info {

    flex-wrap: nowrap;

  }




}
</style>