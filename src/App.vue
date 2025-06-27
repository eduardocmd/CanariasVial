<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from "vue-router";
import HeadderApp from "@/components/HeadderApp.vue";
import FooterWeb from "@/components/FooterWeb.vue";
import AsideMenu from './components/AsideMenu.vue';
import { useIsleStore } from '@/stores/isle'
import SelectorIslaView from './views/bot/SelectorIslaView.vue';
import SelectorIslaWeb from './components/SwitchIslaWeb.vue';

// Obtén la información de la ruta actual
const route = useRoute();
// Instanciamos el store
const isleStore = useIsleStore()


const currentIsle = computed(() => isleStore.isle)
function cambiarIsle(nuevoIsle: string) {
  isleStore.setIsle(nuevoIsle)
}

const isInBot = computed(() => route.meta.hideHeader === true);
</script>
<template>
  <template v-if="!currentIsle">
    <SelectorIslaWeb></SelectorIslaWeb>
  </template>

  <template v-else-if="isInBot">
    <!-- Vista para el bot -->
    <RouterView />
  </template>

  <template v-else>
    <!-- Layout normal -->
    <HeadderApp />
    <AsideMenu />
    <main class="layout-wrapper">
      <div class="layout-content">
        <RouterView />
      </div>
      <FooterWeb />
    </main>
  </template>

</template>
<style scoped>
.layout-content {
  border-radius: 2rem;
  background-color: rgb(156, 156, 156);
  border-top: 1px solid var(--surface-border);
  overflow: auto;
  padding: 1.5rem;
  background-color: var(--color-background);
  border-top-left-radius: 20px;
  box-shadow: inset 0 3px 4px #0000001a;
}

@media screen and (min-width: 768px) {
  .layout-content {
    height: calc(100vh - var(--menu-size));
    padding: 1rem;
  }

  .layout-wrapper {
    padding-left: var(--menu-size);
    padding-top: var(--menu-size);
    background-color: var(--color-background-soft);
  }
}
</style>