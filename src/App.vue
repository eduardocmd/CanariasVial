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

  
    <HeadderApp  v-if="!hideHeader" />
    <aside v-if="!hideHeader">
    <h2>Menú lateral</h2>
  </aside>
      <RouterView v-if="!hideHeader" />
  
  <!--Vista para el bot-->
  <RouterView v-if="hideHeader" />
</template>

<style scoped>


aside {
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  bottom: 1rem;
  width: 80%;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: rgba(31, 101, 163, 0.479);
}


 
    /* Orden por defecto en dispositivos de pantalla grande */


@media screen and (min-width: 768px) {




  aside {
   
    display: flex;

    top: 0;
    left: 0;
    transform: translateX(0);
    height: calc(100vh - 10px);
    width: 150px;
    background-color: rgb(29, 28, 128);
  
  }




}
</style>
