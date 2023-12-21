import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import getRoute from '@/src/route';
import getAddress from '@/src/address';
import getWeather from '@/src/weather';
import Loader from '@/components/Loader';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDatabase } from '@/firebase/database';
import { Accordion } from '@/components/Accordion';
import { useAuth } from '@/firebase/auth';

const Map = dynamic(() => import('../components/LeafletMapResult'), {
    ssr: false
})

export const resultContext = createContext();

export default function Result() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const { updateDatabase, setHistory } = useDatabase();
    const { sa, sn, da, dn, t } = router.query;
    const [finalResult, setFinalResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addStart, setAddStart] = useState('');
    const [addDest, setAddDest] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeDest, setTimeDest] = useState('');
    const time13 = +new Date(t);

    useEffect(() => {
        const fetchData = async () => {
            if (sa && sn && da && dn && time13) {
                try {
                    // const result = await getWeather(await getAddress(await getRoute(sn, sa, dn, da, time13)));
                    // console.log(result);
                    // setFinalResult(result);

                    // ---------------------------------------------------------
                    
                    const data = await (await fetch('/data.json')).json();
                    console.log(data);
                    setFinalResult(data);
                } catch (error) {
                    console.error('ERROR_result_Result_trifetch:', error);
                } finally {
                    setLoading(false);
                };
            };
        };
        fetchData();
    }, [sa, sn, da, dn, time13]);

    useEffect(() => {
        if (finalResult) {
            setAddStart(finalResult[0].address);
            setAddDest(finalResult.at(-1).address);
            setTimeStart(new Date(finalResult[0].time).toLocaleString(
                'en-US', {
                dateStyle: 'medium',
                timeStyle: 'medium',
                hour12: false
            }));
            setTimeDest(new Date(finalResult.at(-1).time).toLocaleString(
                'en-US', {
                dateStyle: 'medium',
                timeStyle: 'medium',
                hour12: false
            }));

            setHistory(currentUser.uid, finalResult[0], finalResult.at(-1))
                .then(() => console.log('saved to history'))
                .catch(error => console.error(error.code));
        };
    }, [finalResult]);

    function saveData(finalResult) {
        updateDatabase(currentUser.uid, finalResult)
            .then(() => alert('SAVED SUCCESSFULLY'))
            .catch(error => console.error(error.code));
    }

    return <>
        <Head>
            <title>Trip Weather: Result</title>
        </Head>

        {/* title */}
        <div>{`From: ${addStart}`}</div>
        <div>{`To: ${addDest}`}</div>
        <div>{`(${sa}, ${sn}) to (${da}, ${dn})`}</div>
        <div>{`${timeStart} - ${timeDest}`}</div>

        {loading && currentUser
            ? <Loader data={''} />
            : <>
                <resultContext.Provider value={{ finalResult }}>
                    <Map />
                </resultContext.Provider>

                {/* details */}
                <button onClick={() => saveData(finalResult)}>save data</button>

                <div className='flex justify-center'>
                    <div className='grid grid-cols-[repeat(2,1fr)] w-fit gap-[30px] text-[large] bg-[color:var(--blue-sky-transparent)] mt-[30px] p-10 rounded-[10px]'>
                        {finalResult.map(obj => <Accordion key={obj.id} data={obj} />)}
                    </div>
                </div>
            </>
        }

        <a href='#map' className='rounded-full w-10 h-10 flex justify-center items-center fixed bg-slate-500 text-white no-underline z-[100] px-1 py-2 border-[none] right-[30px] bottom-[30px]'><svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg></a>

        <Link href='/documentation' target='_blank'>Documentation</Link>
    </>
}