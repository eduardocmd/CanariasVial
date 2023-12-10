<template>
    <header>
        <section>
            <RouterLink :to="{ name: 'roadmap' }">
                <p class="enlaces">RoadMap</p>
            </RouterLink>
            <RouterLink :to="{ name: 'cookies' }">
                <p class="enlaces">Política Cookies</p>
            </RouterLink>
        </section>

        <section>
            <a href="https://twitter.com/Canariasviale" target="_blank">
                <xLogo class="logo" />
               
            </a>
            <a href="https://github.com/eduardocmd" target="_blank">
            <githubLogo class="logo" />
        </a>
        </section>
    </header>
    <main>



        <h2>¿Qué es Canarias Vial?</h2>

        <p> Canarias Vial es un proyecto personal enfocado en alertas de tráfico.
        </p>
        <h2>¿Por qué alertas de tráfico?</h2>

        Como desarrollador, me apasiona la tecnología y su capacidad para mejorar nuestras vidas diarias. Inicié CanariasVial (previamente AlertasTráficoTnf) con la idea de compartir información sobre alertas de tráfico, contribuyendo al mundo de la programación y ofreciendo un servicio valioso a quienes comparten mi interés en el tráfico y la movilidad.
        <h2>¿Quién está detrás de Canarias Vial?</h2>

        <p> Soy Eduardo, Desarrollador web.Completé mi ciclo superior en DAW y, desde entonces, he continuado mi aprendizaje
            de manera autodidacta.Este proyecto es mi manera de contribuir al mundo de la programación y, al mismo tiempo,
            ofrecer un servicio valioso a quienes comparten mi interés en el tráfico y la movilidad.
        </p>
        <h2>Únete a la Comunidad Canarias Vial</h2>

        <p> Canarias Vial es un lugar donde la información fluye libremente. Únete a nuestra comunidad para compartir y
            recibir alertas de tráfico en tiempo real. ¡Hagamos juntos nuestras carreteras más seguras!

            ¡Gracias por ser parte de esta emocionante travesía!</p>
        <div class="d-flex">
            <a href="https://t.me/+6cbnkbEqc4ZjMWNk" target="_blank">     <p class="enlaces">Chat oficial <img class="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                    alt=""></p></a>
           <a href="https://t.me/+e9VvKdtdrPRiMjJk" target="_blank"> <p class="enlaces">Canal de alertas <img class="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                    alt=""></p></a>
        </div>

    </main>
</template>
<style scoped>
.logo {
    margin: 0.5rem;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}



section {
    display: flex;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

}


</style>
<script setup lang="ts">
import xLogo from '@/components/icons/xLogo.vue';
import githubLogo from '@/components/icons/githubLogo.vue';

</script>