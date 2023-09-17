<template>
    <h2>Ajustes</h2>
    <RouterLink  :to="{ name: 'selectorisla' }">
    Cambiar Isla</RouterLink>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
    window.Telegram.WebApp.setHeaderColor("secondary_bg_color")
window.Telegram.WebApp.BackButton.show()


 })

</script>