import Image from 'next/image';

export default function Loader(props) {
    return <>
        <div className='inline-block text-center'>
            <Image src='/loader.svg' alt='loader' width={100} height={100} priority />
            <div>
                <div>Loading...</div>
                <div>{props.value}</div>
            </div>
        </div>
    </>
}