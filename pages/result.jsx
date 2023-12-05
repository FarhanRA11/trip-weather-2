import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import getRoute from '@/src/route'
import Loader from '@/components/Loader'
import { Accordion } from '@/components/Accordion'
import Link from 'next/link'

const Map = dynamic(() => import('../components/LeafletMapResult'), {
    ssr: false
})

export const resultContext = createContext();

export default function Result() {
    const [finalResult, setFinalResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const fixSteps = [];
    const { sa, sn, da, dn, t } = router.query;
    const time13 = +new Date(t);

    useEffect(() => {
        if (sa && sn && da && dn && time13) {
            // getRoute(sn, sa, dn, da, time13, fixSteps)
            //     .then(result => {
            //         setFinalResult(result)
            //         setLoading(false)
            //     })
            //     .catch(error => {
            //         console.error('ERROR_result_Result_trifetch:', error);
            //     });

            // -----------------------------------------------------------------

            fetch('/data.json')
                .then(result => result.json())
                .then(data => {
                    setFinalResult(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('ERROR_result_Result_trifetch:', error);
                });
        }
    }, [sa, sn, da, dn, time13, loading])

    return <>
        <div>{`(${sa}, ${sn}) to (${da}, ${dn})`}</div>
        <div>{new Date(time13).toLocaleString(
            'en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
            hour12: false
        })}</div>

        {loading
            ? <Loader />
            : <>
                <resultContext.Provider value={{ finalResult }}>
                    <Map />
                </resultContext.Provider>
                <div className='flex justify-center'>
                    <div className='grid grid-cols-[repeat(2,1fr)] w-fit gap-[30px] text-[large] bg-[color:var(--blue-sky-transparent)] mt-[30px] p-10 rounded-[10px]'>
                        {finalResult.map(obj => <Accordion key={obj.id} data={obj} />)}
                    </div>
                </div>
            </>
        }

        <Link href='#map' className='rounded-full w-10 h-10 flex justify-center items-center fixed bg-slate-500 text-white no-underline z-[100] px-2.5 py-[5px] border-[none] right-[30px] bottom-[30px]'>^</Link>
    </>
}