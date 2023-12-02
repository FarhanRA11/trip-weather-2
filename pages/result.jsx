import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import getRoute from '@/src/route'

const Map = dynamic(() => import('../components/LeafletMapResult'), {
    ssr: false
})

export default function Result() {
    const [done, setDone] = useState(false)
    const [finalResult, setFinalResult] = useState(null)
    var fixSteps = [];
    const router = useRouter();
    const { sa, sn, da, dn, t } = router.query
    const time13 = +new Date(t);

    useEffect(() => {
        if (sa && sn && da && dn && time13) {
            console.log(`${sn},${sa};${dn},${da}`)
            getRoute(sn, sa, dn, da, time13, fixSteps)
                .then(result => {
                    setFinalResult(result)
                    setDone(true)
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

        <div>
            <Map />
        </div>

        {finalResult && (
            <div>
                <pre>{JSON.stringify(finalResult, null, 2)}</pre>
            </div>
        )}
    </>
}