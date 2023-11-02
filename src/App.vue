<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from "vue-router";
import HeadderApp from "@/components/HeadderApp.vue"
import router from '@/router'


// Obtén la información de la ruta actual
const route = useRoute();

const hideHeader = computed(() => {
  return route.meta.hideHeader === true;
});
onMounted(async () => {
  //Si no hay bot, carga la base de la web.
  if (!window.Telegram.WebApp.initDataUnsafe.user) {
    import('./assets/base.css');




  } else {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.BackButton.onClick(() => {

      router.back()
      window.Telegram.WebApp.BackButton.hide()
      window.Telegram.WebApp.MainButton.hide()
    })
  }


})

</script>

<template>
  <!--Vista para la web-->

  <main>
    <HeadderApp class="header" v-if="!hideHeader" />
    <section class="vista">
      <RouterView v-if="!hideHeader" />
    </section>
  </main>
  <aside v-if="!hideHeader">
    <h2>Menú lateral</h2>
  </aside>

  <!--Vista para el bot-->
  <RouterView v-if="hideHeader" />
</template>

<style scoped>
main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

}

.header {
  height: 100px;
  overflow: hidden;
  background-color: rgb(38, 63, 55);
  width: 100%;
}

aside {
  height: 100px;
  
  width: 100%;
  background-color: aliceblue;
}

.vista {
 width: 100%;
 height: 100%;
  background-color: rgb(126, 12, 126);

  overflow: auto;


}


@media screen and (min-width: 768px) {
  main {
    order: 2;
  
  }




  aside {

    height: auto;
    width: 150px;
    background-color: rgb(29, 28, 128);
    order: 1;
    /* Orden por defecto en dispositivos de pantalla grande */
  }




}
</style>
