<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from "vue-router";
import HeadderApp from "@/components/HeadderApp.vue"
import FooterWeb from "@/components/FooterWeb.vue"
import AsideMenu from './components/AsideMenu.vue';


// Obtén la información de la ruta actual
const route = useRoute();

const isInBot = computed(() => {
  return route.meta.hideHeader === true;
});

</script>

<template>
  <HeadderApp v-if="!isInBot" />
  <AsideMenu v-if="!isInBot"/>


  <main class="layout-wrapper" v-if="!isInBot">
    <div class="layout-content" v-if="!isInBot">

      <RouterView v-if="!isInBot" />
<FooterWeb v-if="!isInBot"/>
    </div>

  </main>

 
  <!--Vista para el bot-->
  <RouterView v-if="isInBot" />
</template>

<style scoped>
.layout-content {
  border-radius: 2rem;
  background-color: rgb(156, 156, 156);
}



.layout-content {

  border-top: 1px solid var(--surface-border);
  overflow: auto;

  padding: 1.5rem;
  background-color: var(--color-background);
  border-top-left-radius: 20px;
  box-shadow: inset 0 3px 4px #0000001a;
}

@media screen and (min-width: 768px) {

  .layout-content {

    border-top: 1px solid var(--surface-border);
    overflow: auto;
    height: calc(100vh - var(--menu-size));
    padding: 1rem;
    background-color: var(--color-background);
    border-top-left-radius: 20px;
    box-shadow: inset 0 3px 4px #0000001a;
  }

  .layout-wrapper {

    padding-left: var(--menu-size);
    padding-top: var(--menu-size);
    background-color: var(--color-background-soft);

  }






}
</style>
