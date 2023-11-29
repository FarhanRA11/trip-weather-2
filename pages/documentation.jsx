import React, { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Documentation() {
    return <>
        <p>Trip Weather Documentation</p>
        <Image src="/tech/firebase.png" alt="firebase" width={100} height={100} priority />
    </>

}