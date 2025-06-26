<template>


    <div id="map" style="height: 300px; width: 100%; position: relative;">
        <button @click.stop="solicitarUbicacion" id="ubi">📍</button>

    </div>



</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import L from 'leaflet';
import { useIsleStore } from '@/stores/isle'
const emit = defineEmits(['coordenadas-seleccionadas']);
const zoom = ref(10);
const map = ref<L.Map | null>();
const selectedCoords = ref<{ lat: number; lng: number } | null>(null);
const marker = ref<L.Marker | null>(null);
// Instanciamos el store
const isleStore = useIsleStore()
const center = ref<[number, number]>([28.4696, -16.2536]); // Tipo LatLngTuple
onMounted(() => {
    map.value = L.map('map').setView(center.value, zoom.value);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors & Carto',
        subdomains: 'abcd',
        maxZoom: 19,
        maxNativeZoom: 19
    }).addTo(map.value!);




    map.value.on('click', (e: L.LeafletMouseEvent) => {
        setMarker(e.latlng.lat, e.latlng.lng);
    });

    centrarMapaSegunIsla()

    map.value.invalidateSize();

    // Inicializar el LocationManager de Telegram
    if (window.Telegram?.WebApp?.LocationManager) {
        window.Telegram.WebApp.LocationManager.init();
    }
});
const boundsLPGC = L.latLngBounds(
    L.latLng(27.70, -15.90), // suroeste (min lat, min lng)
    L.latLng(28.20, -15.25)  // noreste (max lat, max lng)
)

const boundsTNF = L.latLngBounds(
    L.latLng(27.80, -17.00), // suroeste
    L.latLng(28.70, -16.00)  // noreste
)
const isInBounds = (lat: number, lng: number): boolean => {
    if (isleStore.isle === 'lpgc') {
        return boundsLPGC.contains(L.latLng(lat, lng))
    } else if (isleStore.isle === 'tnf') {
        return boundsTNF.contains(L.latLng(lat, lng))
    }
    return false
}

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
const setMarker = (lat: number, lng: number) => {
    if (!isInBounds(lat, lng)) {
        alert('❌ Por favor, selecciona un punto dentro de tu isla.')
        return
    }
    selectedCoords.value = { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) };
    emit('coordenadas-seleccionadas', selectedCoords.value);

    const iconHtml = L.divIcon({
        html: '📍',
        className: 'emoji-marker',
        iconSize: [32, 32],
        iconAnchor: [32, 32],
    });

    if (marker.value) {
        marker.value.setLatLng([lat, lng]);
        marker.value.setIcon(iconHtml);
    } else {
        marker.value = L.marker([lat, lng], { icon: iconHtml }).addTo(map.value!);
    }

    map.value?.setView([lat, lng], 15);
};

const solicitarUbicacion = () => {

    const locationManager = window.Telegram?.WebApp?.LocationManager;


    if (locationManager && locationManager.isLocationAvailable) {
        locationManager.getLocation((location) => {
            if (location) {
                const { latitude, longitude } = location;
                setMarker(latitude, longitude);
            } else {
                alert('❌ No se pudo obtener tu ubicación.');
            }
        });
    } else {
        alert('❌ Los servicios de ubicación no están disponibles en este dispositivo.');
    }
};
</script>

<style>
#map {
    margin-top: 20px;
    position: relative;
    /* Muy importante para que el botón se posicione dentro */
}

#ubi {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    /* Suficiente para estar por encima del mapa */
    background-color: var(--color-button);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    font-size: 2rem;
    padding: 6px 12px;
}




.emoji-marker {
    font-size: 2rem;
    /* Tamaño del emoji */
    text-align: center;
    line-height: 1;
}
</style>