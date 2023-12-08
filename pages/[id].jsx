import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router"
import Head from 'next/head';
import { NotAllowed, NotLoggedIn } from "@/components/Error";

export default function Profile() {
    const router = useRouter();
    const { currentUser, logout } = useAuth();
    const name = router.query.id;

    if (!currentUser) {
        return <NotLoggedIn />
    } else if (currentUser.displayName !== name) {
        return <NotAllowed />
    }

    return <>
        <Head>
            <title>Profile: {name}</title>
        </Head>

        {name} profile

        <button onClick={() => logout}>LOGOUT</button>
    </>
}