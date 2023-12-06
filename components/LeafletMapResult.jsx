import 'leaflet/dist/leaflet.css';
import styles from '@/styles/map.module.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { resultContext } from '@/pages/result';
import Image from 'next/image';
import Link from 'next/link'

export default function LeafletMapResult() {
    const { finalResult } = useContext(resultContext);

    function CustomMap() {
        const map = useMap()
        const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

        map.options.zoomSnap = 0.75;
        map.options.maxBounds = bounds;
        map.options.maxBoundsViscosity = 1.0;
        map.options.minZoom = 3;
        map.options.maxZoom = 18;

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
        <MapContainer id='map' className={styles.map} center={finalResult[finalResult.length - 1].coordinate} zoom={10} scrollWheelZoom={true}>
            <CustomMap />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            />

            {finalResult.map(obj => (
                <Marker key={obj.id} position={obj.coordinate} icon={L.icon({ iconUrl: `/markers/${obj.color}.png`, shadowUrl: '/markers/shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -40], shadowSize: [41, 41], shadowAnchor: [12, 41] })}>
                    <Popup>
                        <div className='text-center max-w-[200px]'>
                            {obj.address}<br />
                            {new Date(obj.time).toLocaleString(
                                'en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'medium',
                                hour12: false
                            })}<br />
                            <div className='flex flex-col items-center'>
                                <div className='flex items-center'>
                                    <Image src={`/icons/${obj.weather.text}.png`} alt={obj.weather.text} width={64} height={64} priority className='max-h-16' />
                                    <div className='text-4xl mt-0 mb-0'>{obj.weather.temp}&deg;C</div>
                                </div>
                            </div>
                            <Link href={`#${obj.id}`}>Details</Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </>
}