<script setup lang="ts">
import { computed } from 'vue';
import {  useRoute } from "vue-router";
import HeadderApp from "@/components/HeadderApp.vue"
// Obtén la información de la ruta actual
const route = useRoute();
const hideHeader = computed(() => {
  return route.meta.hideHeader === true;
});
</script>

<template>

  <HeadderApp v-if="!hideHeader"/>
  <RouterView />
</template>

<style scoped>

</style>
