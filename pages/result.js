import { useRouter } from 'next/router'
import React from 'react'

export default function Result() {
    const router = useRouter();
    const {sa, sn, da, dn, t} = router.query

    return <>
        <p>result</p>
        <p>{sa}</p>
        <p>{sn}</p>
        <p>{da}</p>
        <p>{dn}</p>
        <p>{t}</p>
    </>
}
