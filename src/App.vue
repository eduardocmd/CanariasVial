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
  <HeadderApp v-if="!hideHeader" />
  <main>
    <RouterView v-if="!hideHeader" />
  </main>
  <aside v-if="!hideHeader">
    <h2>Menú lateral</h2>
  </aside>
  
  <!--Vista para el bot-->
  <RouterView v-if="hideHeader"/>
</template>

<style scoped>
aside {
  height: 100px;
  width: 100%;
  background-color: aliceblue;
}
main{

height: 100%;
overflow: auto;

}


@media screen and (min-width: 768px) {
  main{
flex: 1; /* Ocupa el espacio restante */

background-color: #ffffff; /* Fondo del contenido principal */

order: 2;
}
  aside {

    height: auto;
    width: 100px;
    background-color: red;
    order: 1;
    /* Orden por defecto en dispositivos de pantalla grande */
  }




}
</style>
