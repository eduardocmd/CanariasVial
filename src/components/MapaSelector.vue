<template>
    <button @click="solicitarUbicacion" id="ubi">
        📍
    </button>

    <div id="map" style="height: 300px; width: 100%; position: relative;"></div>



</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import L from 'leaflet';

const emit = defineEmits(['coordenadas-seleccionadas']);

const map = ref<L.Map | null>();
const selectedCoords = ref<{ lat: number; lng: number } | null>(null);
const marker = ref<L.Marker | null>(null);

onMounted(() => {
    map.value = L.map('map').setView([28.4696, -16.2536], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    map.value.on('click', (e: L.LeafletMouseEvent) => {
        setMarker(e.latlng.lat, e.latlng.lng);
    });



    map.value.invalidateSize();

    // Inicializar el LocationManager de Telegram
    if (window.Telegram?.WebApp?.LocationManager) {
        window.Telegram.WebApp.LocationManager.init();
    }
});

const setMarker = (lat: number, lng: number) => {
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
}

#ubi {
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index: 10000;
    background-color: var(--color-button);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
}

#ubi:hover {
    background-color: #0056b3;
}

.emoji-marker {
    font-size: 2rem;
    /* Tamaño del emoji */
    text-align: center;
    line-height: 1;
}
</style>