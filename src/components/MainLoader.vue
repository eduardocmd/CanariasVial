<template>
    <main>
        <div class="loader"></div>
    </main>

</template>


<style scoped>
main {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

.loader {
    display: inline-grid;
}

.loader:before,
.loader:after {
    content: "";
    grid-area: 1/1;
    height: 30px;
    aspect-ratio: 6;
    --c: #0000 64%, var(--color-background) 66% 98%, #0000 101%;
    background:
        radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
        radial-gradient(35% 146% at 50% -59%, var(--c)) 25% 100%;
    background-size: calc(100%/3) 50%;
    background-repeat: repeat-x;
    -webkit-mask: repeating-linear-gradient(90deg, var(--color-background) 0 15%, #0000 0 50%) 0 0/200%;
    animation: l8 .8s infinite linear;
}

.loader:after {
    scale: -1;
}

@keyframes l8 {
    to {
        -webkit-mask-position: -100% 0
    }
}
</style>