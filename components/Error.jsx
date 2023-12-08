import Link from 'next/link';
import Head from 'next/head';

export function UserNotFound() {
    return <>
        <Head>
            <title>Error</title>
        </Head>

        <p>Error 400</p>
        <p>User Not Found</p>
    </>
}

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

        <p>Error 405</p>
        <p>Not Allowed</p>
        <Link href='/sign-in'>SIGN IN</Link>
    </>
}