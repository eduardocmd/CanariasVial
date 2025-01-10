<template>
    <header>
     
        <div id="logo" :style="{ 'background-image': 'url(./logo.png)' }"></div>
        <div id="header-text">
            <h1>Canarias Vial</h1>
            <h2>Tenerife</h2>
        </div>

    </header>
</template>
<script setup lang="ts">


</script>
<style scoped>
header {
    font-family: Norwester;
    background-color: var(--color-background-soft);
    overflow: hidden;
    display: flex;
    position: relative;
    
    align-items: center;
    padding: 0.5rem;
    max-width: 100%;


}

#header-text {
    margin: auto;
    text-align: center;
}


#header-text h2 {
    color: var(--color-primary);
}



#header-text h2,
h1 {

    margin: 0;
}





#logo {
    height: 60px;
    width: 60px;
    background-size: 100%;
    background-position: bottom center;
    background-color: var(--color-background);
    border-radius: 50%;
    background-repeat: no-repeat;
    flex-shrink: 0;
    position: absolute;

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

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 1.5rem;
    }

}
</style>