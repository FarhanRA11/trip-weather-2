import Head from 'next/head';
import Link from 'next/link';

export function NotLoggedIn() {
    return <>
        <Head>
            <title>Error</title>
        </Head>

        <p>Error 401</p>
        <p>Not Logged In</p>
        <Link href='/sign-in'>SIGN IN</Link>
    </>
}

export function NotAllowed() {
    return <>
        <Head>
            <title>Error</title>
        </Head>

        <p>Error</p>
        <p>Login to this user</p>
        <Link href='/sign-in'>SIGN IN</Link>
    </>
}