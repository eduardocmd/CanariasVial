<template>
   <header>
    <RouterLink  :to="{ name: 'roadmap' }">
        <p class="enlaces">RoadMap</p>
     </RouterLink>
     <RouterLink  :to="{ name: 'roadmap' }">
        <p class="enlaces">Política Cookies</p>
     </RouterLink>
   </header>

    
</template>
<style scoped>
header{
    display: flex;
    flex-wrap: wrap;

}
.enlaces{
    margin: 1rem 0.5rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 0.8rem;
    border-radius: 2rem ;
    background-color: var(--color-hint);
    padding: 0.5rem 2rem;
}

</style>