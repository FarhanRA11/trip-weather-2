import { coordinateContext } from '@/pages';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export default function InputQuery() {
    const { formData, setFormData } = useContext(coordinateContext);
    const [time13, setTime13] = useState(new Date());
    const router = useRouter();

    // input query on change
    const handleChange = e => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.id]: e.target.value
        }));
    };

    // form on submit
    const handleSubmit = e => {
        e.preventDefault();
        router.push({
            pathname: '/result',
            query: formData
        });
    };

    // realtime update min-max time input
    useEffect(() => {
        const intervalId = setInterval(() => {
            const time13Now = Date.now();
            setTime13(time13Now);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDatetime = (num) => {
        const year = new Date(num).getFullYear();
        const month = (new Date(num).getMonth() + 1).toString().padStart(2, '0');
        const day = new Date(num).getDate().toString().padStart(2, '0');
        const hours = new Date(num).getHours().toString().padStart(2, '0');
        const minutes = new Date(num).getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    return <>
        <form onSubmit={handleSubmit} className='flex flex-col w-1/4'>
            <label htmlFor="sa">from</label>
            <input value={formData.sa} onChange={handleChange} id='sa' type="number" min={-90} max={90} placeholder='latitude' title='latitude' step='any' required />
            <input value={formData.sn} onChange={handleChange} id='sn' type="number" min={-180} max={180} placeholder='longitude' title='longitude' step='any' required />

            <br />
            <label htmlFor="da">to</label>
            <input value={formData.da} onChange={handleChange} id='da' type="number" min={-90} max={90} placeholder='latitude' title='latitude' step='any' required />
            <input value={formData.dn} onChange={handleChange} id='dn' type="number" min={-180} max={180} placeholder='longitude' title='longitude' step='any' required />

            <br />
            <label htmlFor="t">depart at</label>
            <input value={formData.timeStart} onChange={handleChange} type="datetime-local" id='t' min={formattedDatetime(time13)} max={formattedDatetime(time13 + 864e6)} required />

            <button type='submit'>submit</button>
        </form>
    </>
}