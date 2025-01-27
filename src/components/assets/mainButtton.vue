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

<style>
button{
  padding: 1rem;
  font-size: 1.4rem;
  color: var(--color-text);
  margin: 0;
  border: none;
  border-radius: 1rem;
  background-color: var(--color-button);
  
}

</style>