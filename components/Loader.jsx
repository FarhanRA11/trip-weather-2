import Image from 'next/image'

export default function Loader() {
    return <>
        <div className='inline-block text-center'>
            <Image src='/loader.svg' alt='loader' width={100} height={100} priority />
            <p>Loading...</p>
        </div>
    </>
}