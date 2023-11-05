<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from "vue-router";
import HeadderApp from "@/components/HeadderApp.vue"



// Obtén la información de la ruta actual
const route = useRoute();

const isInBot = computed(() => {
  return route.meta.hideHeader === true;
});

</script>

<template>
  
  <HeadderApp v-if="!isInBot" />

  <aside v-if="!isInBot">
    <h2>Menú lateral</h2>
  </aside>

  <main class="layout-wrapper" v-if="!isInBot">
    <div class="layout-content" v-if="!isInBot">
      
      <RouterView v-if="!isInBot" />
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

aside {
  position: fixed;
  width: 80%;

  height: var(--menu-size);
  bottom: 0;
  background-color: var(--color-background-soft);
  left: 50%;
  /* Coloca el borde izquierdo del div a la mitad del contenedor */
  transform: translate(-50%, -50%);
  /* Centra el contenido */
}

.layout-content {

  border-top: 1px solid var(--surface-border);
  overflow: auto;

  padding: 2rem;
  background-color: var(--color-background);
  border-top-left-radius: 20px;
  box-shadow: inset 0 3px 4px #0000001a;
}

@media screen and (min-width: 768px) {

  .layout-content {

    border-top: 1px solid var(--surface-border);
    overflow: auto;
    height: calc(100vh - var(--menu-size));
    padding: 2rem;
    background-color: var(--color-background);
    border-top-left-radius: 20px;
    box-shadow: inset 0 3px 4px #0000001a;
  }

  .layout-wrapper {

    padding-left: var(--menu-size);
    padding-top: var(--menu-size);
    background-color: var(--color-background-soft);

  }

  aside {
    position: fixed;
    display: flex;
    align-items: end;
    background-color: transparent;

    top: 0;
    left: 0;
    transform: translateX(0);
    height: calc(100vh);
    width: var(--menu-size);


  }




}
</style>
