import Image from 'next/image';
import Link from 'next/link';

export default function Documentation() {
    return <>
        <p>Trip Weather Documentation</p>

        <div className='my-7'>
            <p>Feature</p>
            <p>
                This website will generate a detailed route between the two locations. You'll be able to see those waypoints along the route on a map, with their corresponding addresses and estimated travel times. You also be able to see at a glance how long it will take you to reach each waypoints. <br />

                And for those who like to be prepared for any eventuality, we've added a weather forecast feature to this website and show you the expected weather conditions at each waypoint, so you can pack accordingly. <br />

                All of those information is displayed in a clear and easy-to-use format, with an interactive map that lets you explore your route. Whether you're a seasoned traveler or a first-time adventurer, our website is the perfect tool for planning your next journey. <br />

                <Link href='/' className='underline'>Try it out now!</Link>
            </p>
        </div>

        <div className='my-7'>
            <p>How to Use</p>
            <div>
                <ul>
                    <li>Enter starting point (select on map or type the coordinate)</li>
                    <li>You can also click "Find My Location" button to auto-pick your starting point</li>
                    <li>Enter destination point (select on map or type the coordinate)</li>
                    <li>Click "Find Result" button</li>
                    <li>Your result will display on a new page</li> 
                    <li>if nothind showed up after few minutes, restart the page</li>
                    <li>Click waypoint on a map to see weather forecast</li>
                    <li>Click "See Weather Details" and "+" to see more weather forecast details</li>
                </ul>
            </div>
        </div>

        <div className='my-7'>
            <p>IPO</p>
            <ul>
                <li>
                    <p>Input</p>
                    <p>User will input latitude and longitude on starting and destination point, starting time is also required</p>
                </li>
                <li>
                    <p>Process</p>
                    <p>Inputted data will be put together. Then, those data will computed through 3 main function. <br />
                        - Find the route between 2 points to determine the waypoint and estimated time. <br />
                        - Check all the waypoints to find each address. <br />
                        - Check all the waypoints to find each weather forecast based from the time at that waypoint.
                    </p>
                </li>
                <li>
                    <p>Output</p>
                    <p>All of those data (route, address, estimated time, weather forecast) will showed at each waypoints on the map if user clicked a marker, while detailed data will showed below the map</p>
                </li>
            </ul>
        </div>

        <div className='my-7'>
            <p>Notes</p>
            <ul>
                <li>Maximum recommended trip is 3 days or 2160km, otherwise the result may not be found</li>
                <li>Using the fastest route</li>
                <li>Not using realtime data (maybe soon)</li>
                <li>Route, address, estimated time, weather forecast isn't 100% accurate or even the opposite from the result</li>
                <li>Some addresses may misspelled or in the wrong order</li>
                <li>All features free to use and I'm not receive anything from it</li>
                <li>Features will continue to be developed</li>
            </ul>
        </div>

        <div className='my-7 flex flex-col items-center'>
            <div className='text-center'>
                <p className='mb-5'>Stack</p>
                <div className='flex flex-wrap justify-center gap-5 mb-5'>
                    <Link href='https://react.dev' target='_blank'>
                        <Image src="/tech/react.png" alt="react" width={78} height={50} priority />
                    </Link>
                    <Link href='https://nextjs.org' target='_blank'>
                        <Image src="/tech/nextjs.png" alt="next" width={80} height={50} priority />
                    </Link>
                    <Link href='https://nodejs.org/en' target='_blank'>
                        <Image src="/tech/nodejs.png" alt="node" width={151} height={50} priority />
                    </Link>
                    <Link href='https://tailwindcss.com' target='_blank'>
                        <Image src="/tech/tailwind.png" alt="tailwind" width={83} height={50} priority />
                    </Link>
                    <Link href='https://firebase.google.com' target='_blank'>
                        <Image src="/tech/firebase.png" alt="firebase" width={50} height={50} priority />
                    </Link>
                    <Link href='https://leafletjs.com' target='_blank'>
                        <Image src="/tech/leaflet.png" alt="leaflet" width={189} height={50} priority />
                    </Link>
                    <Link href='https://project-osrm.org' target='_blank'>
                        <Image src="/tech/osrm.png" alt="osrm" width={148} height={50} priority />
                    </Link>
                    <Link href='https://opencagedata.com' target='_blank'>
                        <Image src="/tech/opencage.png" alt="opencage" width={101} height={50} priority />
                    </Link>
                    <Link href='https://visualcrossing.com' target='_blank'>
                        <Image src="/tech/visual-crossing.png" alt="visualcrossing" width={123} height={50} priority />
                    </Link>
                </div>
            </div>
            <p className='text-center'>
                made by: <Link href='https://github.com/FarhanRA11/trip-weather-2' className='underline'>@FarhanRA11 (github)</Link> <br />
                license: <Link href='https://github.com/FarhanRA11/trip-weather-2/blob/main/LICENSE.md' className='underline'>on github</Link>
            </p>
        </div>

    </>
};