import Head from 'next/head';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/auth";
import { NotAllowed, NotLoggedIn } from "@/components/Error";

export default function Profile() {
    const router = useRouter();
    const { currentUser, logout } = useAuth();
    const [name, setName] = useState('');
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        if (router.query.user) {
            setName(router.query.user)
        }
        if (currentUser) {
            setUser(currentUser)
        }
    }, [router.query.user, currentUser]);

    return <> {user
        ? user.displayName === name
            ? <>
                <Head>
                    <title>Profile: {name}</title>
                </Head>

                <header className="flex flex-col">
                    {name} profile
                    <button onClick={() => {
                        logout()
                            .then(() => router.push('/sign-in'))
                    }}>LOGOUT</button>
                </header>

                <section>
                    data
                </section>
            </>
            : <NotAllowed />
        : <NotLoggedIn />
    }</>
};