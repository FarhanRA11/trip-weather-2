import '@/styles/globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
    weight: ['300', '400', '600'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export default function App({ Component, pageProps }) {
    return (
        <main className={openSans.className}>
            <Component {...pageProps} />
        </main>
    )
}
