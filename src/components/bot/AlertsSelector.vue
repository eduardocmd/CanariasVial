<script lang="ts" setup>
import selectores from "@/alertas.json"
import router from '@/router'


const props = defineProps<{
  isla?: string | null
}>()
const irNuevaAlerta = (tipo :string)=> {

 if(props.isla){
  router.push({ name: 'bot-nuevaalerta:tipo', params: { tipo } });
 }else{
  router.push({ name: 'bot-selectorisla'});
 }
}



</script>
<template>
  <main>
   
    <section id="selector">
  
        <div v-for="selector in selectores" :key="selector.tipo" @click="irNuevaAlerta(selector.tipo)" class="tipoalerta" :style="{ 'background-image': 'url(' + selector.image + ')' }"></div>
 
    </section>
  </main>
</template>
    
<style scoped >

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;

  background-color:  var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);


}

#selector {
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin:  0.2rem 0;
  background-color:  var(--tg-theme-bg-color);
}


.tipoalerta {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  margin: 0.4em;

  &:hover {
    transform: scale(1.2);

  }

}
</style>