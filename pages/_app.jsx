import '@/styles/globals.css';
import { Open_Sans } from 'next/font/google';
import { AuthProvider } from '@/firebase/auth';
import { DatabaseProvider } from '@/firebase/database';

const openSans = Open_Sans({
    weight: ['300', '400', '600'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
});

export default function App({ Component, pageProps }) {
    return <AuthProvider><DatabaseProvider>
        <main className={`${openSans.className} bg-slate-400`}>
            <Component {...pageProps} />
        </main>
    </DatabaseProvider></AuthProvider>
};