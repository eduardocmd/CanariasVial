<template>
   <header> <h2>headder</h2></header>
</template>
<style scoped>

header{
    height: 100px;
  overflow: hidden;
  background-color: rgb(38, 63, 55);
  width: 100%;
}

@media screen and (min-width: 768px) {

header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
}

}
</style>