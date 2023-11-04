<template>
    <header>
        <div id="logo" :style="{ 'background-image': 'url(./logo.png)' }"></div>

        <h1>Canarias Vial</h1>
    </header>
</template>
<style scoped>
header {
    background-color: var(--color-background-soft);
    overflow: hidden;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 0.5rem;
    width: 100%;
  
}


#logo {
    height: 60px;
    width: 60px;
    background-size: 100%;
    background-position: bottom center;
    background-color: var(--color-background);
    border-radius: 50%;

    background-repeat: no-repeat;

}

@media screen and (min-width: 768px) {
    #logo {
        width: 100px;
        height: 100px;
    }

    header {
        position: fixed;
        background-color: transparent;

        top: 0;
        max-height: var(--menu-size);
        width: 100%;
        left: 0;
        z-index: 1;
    }

}
</style>