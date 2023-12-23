import 'leaflet/dist/leaflet.css';
import styles from '@/styles/map.module.css';
import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { coordinateContext } from '@/pages';
import { useGeolocation } from '@/src/geolocation';

export default function LeafletMap() {
    var map;
    const { formData, setFormData } = useContext(coordinateContext);

    // point selected
    const pickStart = (lat, lng) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            sa: lat,
            sn: lng,
        }));
    };
    const pickDest = (lat, lng) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            da: lat,
            dn: lng,
        }));
    };

    // use geoloc
    const getLocation = map => {
        useGeolocation()
            .then(loc => {
                pickStart(loc.lat, loc.lng);
                map.setView([loc.lat, loc.lng], 10);
                alert('Found your location.');
            })
            .catch(err => {
                console.error(err);
            });
    };

    function CustomMap() {
        map = useMap();
        const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

        map.options.zoomSnap = 0.75;
        map.options.maxBounds = bounds;
        map.options.maxBoundsViscosity = 1.0;
        map.options.minZoom = 3;
        map.options.maxZoom = 18;

        // mark a boundries
        L.polygon([
            [91, 180.01],
            [-91, 180.01],
            [-91, 1440],
            [91, 1440]
        ], { color: 'red' }).addTo(map);
        L.polygon([
            [91, -180.01],
            [-91, -180.01],
            [-91, -1440],
            [91, -1440]
        ], { color: 'red' }).addTo(map);

        // add new marker to selected starting point, remove old marker 
        useEffect(() => {
            map.eachLayer((layer) => {
                if (layer.options && layer.options.id === 'start') map.removeLayer(layer);
            });

            if (formData.sa && formData.sn) {
                L.marker([formData.sa, formData.sn], {
                    id: 'start',
                    icon: L.icon({
                        iconUrl: `/markers/red.png`, shadowUrl: '/markers/shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -40], shadowSize: [41, 41], shadowAnchor: [12, 41]
                    }),
                }).addTo(map);
            }
        }, [formData.sa, formData.sn, map]);

        // add new marker to selected destination point, remove old marker 
        useEffect(() => {
            map.eachLayer(layer => {
                if (layer.options && layer.options.id === 'destination') map.removeLayer(layer);
            });

            if (formData.da && formData.dn) {
                L.marker([formData.da, formData.dn], {
                    id: 'destination',
                    icon: L.icon({
                        iconUrl: `/markers/blue.png`, shadowUrl: '/markers/shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -40], shadowSize: [41, 41], shadowAnchor: [12, 41],
                    }),
                }).addTo(map);
            }
        }, [formData.da, formData.dn, map]);

        useMapEvents({
            click: e => {
                let lat = e.latlng.lat.toFixed(6);
                let lng = e.latlng.lng.toFixed(6);

                // design a popup at clicked map
                if (bounds.contains(L.latLng(lat, lng))) {
                    const popupContent = document.createElement('div');
                    popupContent.innerHTML = `<div id="option_map" class=${styles.popup}><div>${lat}, ${lng}</div></div>`;

                    const btnStart = document.createElement('button');
                    btnStart.textContent = 'Set as Origin';
                    btnStart.addEventListener('click', () => pickStart(lat, lng));
                    btnStart.className = styles.btn;

                    const btnDest = document.createElement('button');
                    btnDest.textContent = 'Set as Destination';
                    btnDest.addEventListener('click', () => pickDest(lat, lng));
                    btnDest.className = styles.btn;

                    popupContent.querySelector('#option_map').appendChild(btnStart);
                    popupContent.querySelector('#option_map').appendChild(btnDest);

                    L.popup()
                        .setLatLng(e.latlng)
                        .setContent(popupContent)
                        .openOn(map);
                };
            }
        });
    };

    return <>
        {/* create map */}
        <MapContainer className={styles.map} center={[-0.282876, 118.493230]} zoom={4} scrollWheelZoom={true}>
            <CustomMap />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
        <button onClick={() => getLocation(map)}>Find My Location</button>
    </>
};