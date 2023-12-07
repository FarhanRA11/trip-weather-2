import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { createContext, useState } from 'react';
import InputQuery from '@/components/InputQuery';
import Link from 'next/link'

const Map = dynamic(() => import('../components/LeafletMap'), {
    ssr: false
});

export const coordinateContext = createContext();

const Home = () => {
    const [formData, setFormData] = useState({
        sa: '', sn: '', da: '', dn: '', t: ''
    });

    return <>
        <Head>
            <title>Trip Weather</title>
        </Head>

        {/* header page */}
        <div className='flex flex-row'>
            <Image src='/logo.png' width={200} height={200} alt='logo' priority />
            <div>
                <p>Welcome to Trip Weather website</p>
                <p>the ultimate tool for planning your trips! With user-friendly interface, you can easily pick your starting and destination points, and it&apos;ll take care of the rest.</p>
            </div>
        </div>

        <coordinateContext.Provider value={{ formData, setFormData }}>
            <Map />
            <InputQuery />
        </coordinateContext.Provider>

        <Link href='/documentation' target='_blank'>Documentation</Link>
    </>
};

export default Home;