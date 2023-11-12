<template>
    <h1>Mapa de ruta</h1>
    <main id="roadmap">
        <div id="line">
          
            <div class="circle-down"></div>
        </div>
        <section>
            <div v-for="(age, index) in roadmap" :key="index"  class="age">
               <div class="meditor"></div> <h1>{{ age.age }}</h1>
                <div v-for="(quearter, index) in age.quarters" :key="index">
                    <h2>{{ age.age }} {{ quearter.quarter }}</h2>
                    <div class="things">
                        <p v-for="(thing, index) in quearter.things" :key="index" class="thing">{{ thing.thing }}</p>
                    </div>
                </div>
            </div>
        </section>





    </main>
</template>

<style scoped>
.age:hover .meditor {
    background-color: var(--color-primary);

    transform: scale(1.2);
    transition: transform 0.5s ease, background-color 0.2s ease;

}
.meditor{
    background-color: var(--color-text);
   
    border-radius: 50%;
    position: absolute;
    left: calc(2rem - 5px);
    margin-top: 1rem;
    height: 20px;
    width: 20px;
}
h1 {
    font-size: 2rem;
}

h2 {
    font-size: 1.5rem;
}

p {
    font-size: 1rem;
}

.things {
    display: flex;
    flex-wrap: wrap;

}

.thing {
    display: inline-block;
    text-align: center;
    border-radius: 2rem;
    background-color: var(--color-hint);
    padding: 0.5rem 2rem;
    margin: 1rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    border-radius: 2rem;
    background-color: var(--color-hint);
    padding: 0.5rem 2rem;
}

#line {
    flex-shrink: 0;
    position: relative;
    margin: 0 2rem;
    width: 10px;
    background-color: var(--color-text);
    border-radius: 2rem;
}

main#roadmap {
    display: flex;
    width: 100%;
    position: relative;

}
.circle-down{
    background-color: var(--color-primary);
    height: 20px;
    width: 20px;
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
}

</style>


<script lang="ts" setup>

const roadmap = [

    {
        age: "2024",
        quarters: [

            {
                quarter: "Q2",
                things: [
                    {
                        thing: "Area de noticias",
                        icon: ''
                    }
                ]

            },
            {
                quarter: "Q1",
                things: [
                    {
                        thing: "Alertas tráfico usuarios",
                        icon: ''
                    },
                    {
                        thing: "Inicio sesión con Telegram",
                        icon: ''
                    }
                ]

            }
        ]
    },
    {
        age: "2023",
        quarters: [
            {
                quarter: "Finales de mes",
                things: [
                
                    {
                        thing: "Nuevo Diseño del MiniApp Telegram (BOT)",
                        icon: ''
                    },
                    {
                        thing: "Creación de la web y diseño inicial",
                        icon: ''
                    },
                    {
                        thing: "Despliegue de la Web",
                        icon: ''
                    }
                ]

            }
        ]
    }
]


</script>