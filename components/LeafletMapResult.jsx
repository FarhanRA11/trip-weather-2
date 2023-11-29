import 'leaflet/dist/leaflet.css';
import styles from '@/styles/map.module.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export default function LeafletMapResult() {
    function CustomMap() {
        const map = useMap()
        const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

        map.options.zoomSnap = 0.75;
        map.options.maxBounds = bounds;
        map.options.maxBoundsViscosity = 1.0;
        map.options.minZoom = 3;
        map.options.maxZoom = 19;

        L.polygon([
            [91, 180.01],
            [-91, 180.01],
            [-91, 1440],
            [91, 1440]
        ], { color: 'red' }).addTo(map)
        L.polygon([
            [91, -180.01],
            [-91, -180.01],
            [-91, -1440],
            [91, -1440]
        ], { color: 'red' }).addTo(map)
    }

    return <>
        <MapContainer className={styles.map} center={[-0.282876, 118.493230]} zoom={4} scrollWheelZoom={true}>
            <CustomMap />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            />
        </MapContainer>
    </>
}