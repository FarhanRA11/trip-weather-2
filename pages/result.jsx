import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import getRoute from '@/src/route'
import Loader from '@/components/Loader'
import AllDetails from '@/components/AllDetails'

const Map = dynamic(() => import('../components/LeafletMapResult'), {
    ssr: false
})

export const resultContext = createContext();

export default function Result() {
    const [done, setDone] = useState(false)
    const [finalResult, setFinalResult] = useState(null)
    const [loading, setLoading] = useState(true)
    var fixSteps = [];
    const router = useRouter();
    const { sa, sn, da, dn, t } = router.query;
    const time13 = +new Date(t);

    useEffect(() => {
        if (sa && sn && da && dn && time13) {
            // console.log(`${sn},${sa};${dn},${da}`)
            // getRoute(sn, sa, dn, da, time13, fixSteps)
            //     .then(result => {
            //         setFinalResult(result)
            //         setDone(true)
            //         setLoading(false)
            //     })
            //     .catch(error => {
            //         console.error('ERROR_result_Result_trifetch:', error);
            //     });

            fetch('/data.json')
                .then(result => result.json())
                .then(data => {
                    setFinalResult(data)
                    setDone(true)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('ERROR_result_Result_trifetch:', error);
                });
        }
    }, [sa, sn, da, dn, time13, done])

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
            : <resultContext.Provider value={{ finalResult }}>
                <Map />
                <AllDetails />
            </resultContext.Provider>
        }
    </>
}