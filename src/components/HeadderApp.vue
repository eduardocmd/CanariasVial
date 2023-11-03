<template>
   <header> <h2>headder</h2></header>
</template>
<style scoped>

header{

overflow: hidden;
background-color: rebeccapurple;

width: 100%;
}


@media screen and (min-width: 768px) {

header{
    position: fixed;
    background-color: transparent;
    top: 0;
    height: var(--menu-size);
    width: 100%;
    left: 0;
    z-index: 999;
}

}
</style>