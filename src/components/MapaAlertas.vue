<template>
    <div id="map" style="height: 350px; width: 100%;"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import { getAlertas } from '@/services/alertas';
import alertasJSON from '@/alertas.json';

import type { AlertaType } from '@/models/Alerts';
const map = ref<L.Map>();
const center = ref<[number, number]>([28.4696, -16.2536]); // Tipo LatLngTuple
const zoom = ref(10);
const alertas = ref();
import { useIsleStore } from '@/stores/isle'


// Instanciamos el store
const isleStore = useIsleStore()
onMounted(async () => {
    centrarMapaSegunIsla();
    if (map.value) {
        map.value.setView(center.value, zoom.value);
    } else {
        map.value = L.map('map').setView(center.value, zoom.value);
    }


    alertas.value = (await getAlertas(isleStore.isle)).data;


    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 9, // 👈 límite mínimo
        maxNativeZoom: 19
    }).addTo(map.value!);




    //Poner marcadores en el mapa
    alertas.value.forEach((alerta: AlertaType) => {
        console.log(alerta)
        let imagen = getImagen(alerta.tipo_alerta);
        const iconoPersonalizado = L.icon({
            iconUrl: imagen, // Ruta a la imagen del icono
            iconSize: [38, 95], // Tamaño del icono (ancho, alto)
            iconAnchor: [22, 94], // Punto del icono que se corresponde con la ubicación del marcador
            popupAnchor: [-3, -76] // Punto desde el que se abre el popup
        });


        if (!alerta.latitud || !alerta.longitud) return;
        if (!map.value) return;
        const marker = L.marker([alerta.latitud, alerta.longitud], { icon: iconoPersonalizado }).addTo(map.value);
        marker.bindPopup(alerta.alerta);
    });



    map.value?.invalidateSize();


});

watch(() => isleStore.isle, async (nuevaIsla) => {
    centrarMapaSegunIsla();
    alertas.value = (await getAlertas(nuevaIsla)).data;

    // Limpia marcadores anteriores para no acumular (opcional)
    if (map.value) {
        map.value.eachLayer((layer) => {
            // Excluye la capa base (tileLayer)
            if (!(layer instanceof L.TileLayer)) {
                map.value?.removeLayer(layer);
            }
        });

        // Añade los nuevos marcadores
        alertas.value.forEach((alerta: AlertaType) => {
            if (!alerta.latitud || !alerta.longitud) return;
            const imagen = getImagen(alerta.tipo_alerta);
            const iconoPersonalizado = L.icon({
                iconUrl: imagen,
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76]
            });

            const marker = L.marker([alerta.latitud, alerta.longitud], { icon: iconoPersonalizado }).addTo(map.value!);
            marker.bindPopup(alerta.alerta);
        });

        map.value.invalidateSize();
    }
});



const getImagen = (tipoAlerta: string): string => {
    const tipo = alertasJSON.find((tipos) => tipos.tipo == tipoAlerta);
    console.log(tipo)
    return tipo ? tipo.image : '';
};
const centrarMapaSegunIsla = () => {
    if (isleStore.isle === 'lpgc') {
        center.value = [28.1235, -15.4363]; // Coordenadas Gran Canaria (puedes ajustar)
    } else {
        center.value = [28.4696, -16.2536]; // Coordenadas Tenerife
    }

    if (map.value) {
        map.value.setView(center.value, zoom.value);
    }
};
</script>
<style>
.leaflet-control-attribution {
    display: none !important;
}

/* Estilos adicionales para el mapa */
#map {
    margin-top: 20px;
    /* Espacio entre el contenido y el mapa */
}
</style>