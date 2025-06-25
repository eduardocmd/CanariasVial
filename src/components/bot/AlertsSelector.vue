<template>
  <main>


    <section id="selector" ref="selectorRef" :class="{ recogido: selectedTipo }" @transitionend="handleTransitionEnd">
      <div v-for="item in selectores" :key="item.tipo" class="tipoalerta"
        :class="{ seleccionado: selectedTipo?.tipo === item.tipo }"
        :style="{ backgroundColor: selectedTipo?.tipo === item.tipo ? item.color : 'transparent' }"
        @click="select(item)" :data-tipo="item.tipo">
        {{ item.tipo }}
      </div>
    </section>
    <img :src="urlchange" v-if="selectedTipo" @click="selectedTipo = null" class="cambiar-btn" />
  </main>
</template>

<script lang="ts" setup>
import { ref, type Ref, nextTick } from 'vue'

interface Selector {
  tipo: string
  icono: string
  color: string
  image: string
}

import rawSelectores from '@/alertas.json'
const selectores: Selector[] = rawSelectores as Selector[]
const urlchange = import.meta.env.BASE_URL + 'arrows-rotate-solid.svg'
const selectedTipo = ref<Selector | null>(null)
const selectorRef = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (event: 'alertaSeleccionada', tipo: Ref): void
}>()

let scrollPendingTipo = ref<string | null>(null)

function select(item: Selector) {
  selectedTipo.value = item
  scrollPendingTipo.value = item.tipo
  emit('alertaSeleccionada', selectedTipo)
}

function handleTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'height') return
  if (!scrollPendingTipo.value) return

  const container = selectorRef.value
  const el = container?.querySelector<HTMLElement>(
    `.tipoalerta[data-tipo="${scrollPendingTipo.value}"]`
  )
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  scrollPendingTipo.value = null
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
  padding: 1rem;
}

.cambiar-btn {
  padding: 8px 16px;
  font-weight: bold;
  width: 60px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#selector {
  width: 220px;
  height: 180px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 10px;
  transition: height 0.3s ease, padding 0.3s ease;
}

#selector.recogido {
  height: 50px;
  padding: 5px 10px;
  overflow: hidden;
}

.tipoalerta {
  margin: 3px 0;
  text-align: center;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tipoalerta:hover {
  background-color: rgba(0, 0, 255, 0.3);
}

.tipoalerta.seleccionado {
  border: 2px solid var(--tg-theme-button-color, #000);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
