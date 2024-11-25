<template>
    <button>{{ valueText }}</button>
</template>
<script setup lang="ts">
defineProps({
    valueText: {
    type: String,
    required: true,
  },
});


</script>