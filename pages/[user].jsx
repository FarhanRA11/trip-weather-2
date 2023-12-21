import Head from 'next/head';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/auth";
import { NotAllowed, NotLoggedIn } from "@/components/Error";
import { useDatabase } from '@/firebase/database';
import exportToExcel from '@/src/export';

export default function Profile() {
    const router = useRouter();
    const { currentUser, logout } = useAuth();
    const { getData, deleteData } = useDatabase();
    const [name, setName] = useState('');
    const [user, setUser] = useState(currentUser);
    const [saved, setSaved] = useState(null);

    useEffect(() => {
        if (router.query.user || currentUser) {
            setName(router.query.user)
            setUser(currentUser)
            getData(currentUser.uid)
                .then(response => {
                    setSaved(response.data());
                })
                .catch(error => console.error(error.code))
        }
    }, [router.query.user, currentUser]);

    function openHandler(sa, sn, da, dn, time13) {
        //2023-12-27T14:43
        const year = new Date(time13).getFullYear();
        const month = (new Date(time13).getMonth() + 1).toString().padStart(2, '0');
        const day = new Date(time13).getDate().toString().padStart(2, '0');
        const hours = new Date(time13).getHours().toString().padStart(2, '0');
        const minutes = new Date(time13).getMinutes().toString().padStart(2, '0');

        router.push({
            pathname: '/result',
            query: { sa: sa, sn: sn, da: da, dn: dn, t: `${year}-${month}-${day}T${hours}:${minutes}` }
        });
    }

    function deleteHandler(index, location) {
        deleteData(currentUser.uid, index, location)
            .then(() => router.reload())
            .catch(error => console.error(error.code))
    }

    return <> {user
        ? user.displayName === name
            ? <>
                <Head>
                    <title>Profile: {name}</title>
                </Head>

                <header className="flex flex-col">
                    {name} profile
                    <button onClick={() => {
                        logout().then(() => router.push('/sign-in'))
                    }}>LOGOUT</button>
                </header>

                <section className='flex flex-col p-10'>
                    SAVED:
                    {saved?.data.map((obj, index) =>
                        <div key={index} className='p-1 m-1'>
                            <div>
                                savedTime: {obj.savedTime} <br />
                                {obj.steps[0].address} - {obj.steps.at(-1).address} <br />
                                ({(obj.steps[0].coordinate).join(', ')}) to ({(obj.steps.at(-1).coordinate).join(', ')}) <br />
                                {obj.steps[0].time} - {obj.steps.at(-1).time} <br />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <button onClick={() => openHandler(obj.steps[0].coordinate[0], obj.steps[0].coordinate[1], obj.steps.at(-1).coordinate[0], obj.steps.at(-1).coordinate[1], obj.steps[0].time)}>open</button>
                                <button onClick={() => exportToExcel(obj.steps)}>download</button>
                                <button onClick={() => deleteHandler(index, 'data')}>delete</button>
                            </div>
                        </div>
                    )}
                </section>

                <section className='flex flex-col p-10'>
                    HISTORY:
                    {saved?.history.map((obj, index) => obj.savedTime + 864e6 > Date.now() &&
                        <div key={index} className='p-1 m-1'>
                            <div>
                                savedTime: {obj.savedTime} <br />
                                {obj.addStart} - {obj.addDest} <br />
                                ({obj.sa}, {obj.sn}) - ({obj.da}, {obj.dn}) <br />
                                {obj.timeStart} - {obj.timeDest} <br />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <button onClick={() => openHandler(obj.sa, obj.sn, obj.da, obj.dn, obj.timeStart)}>open</button>
                                <button onClick={() => deleteHandler(index, 'history')}>delete</button>
                            </div>
                        </div>
                    )}
                </section>
            </>
            : <NotAllowed />
        : <NotLoggedIn />
    }</>
};