import { useState } from 'react';
import Image from 'next/image'

export const Accordion = props => {
    const [data, setData] = useState(props.data);
    const expandAccordion = () => {
        let newActive = data.active === 1 ? 0 : 1;
        setData({ ...data, active: newActive });
    }

    return <>
        <div id={data.id} className={`bg-[#e9e9e9] flex flex-col p-5 border border-[#c9c6c655] rounded-md w-full duration-500 group ${data.active === 1 ? 'is-active' : ''}`}>
            <div onClick={expandAccordion} className='text-end'><div className='text-3xl duration-500 cursor-pointer inline-block group-[.is-active]:rotate-[135deg]'>+</div></div>
            <div className="flex datas-center">
                <div className="w-full text-center flex flex-col items-center duration-500 group-[.is-active]">
                    {data.address}<br />
                    {new Date(data.time).toLocaleString(
                        'en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                        hour12: false
                    })}<br />
                    <div className='flex items-center'>
                        <Image src={`/icons/${data.weather.text}.png`} alt={data.weather.text} width={64} height={64} priority className='max-h-16' />
                    </div>
                    {data.weather.title}<br />
                    rain probability: {data.weather.precipprob}%<br />
                    temperature: {data.weather.temp}&deg;C<br />
                    wind speed: {data.weather.windspeed} km/h<br />
                </div>
            </div>
            <div className="overflow-hidden max-h-0 group-[.is-active]:max-h-[280px] duration-500">
                precipitaion: {data.weather.precip} mm<br />
                cloud cover: {data.weather.cloudcover}%<br />
                humidity: {data.weather.humidity}%<br />
                snow: {data.weather.snow} cm<br />
                snow depth: {data.weather.snowdepth} cm<br />
                feelslike: {data.weather.feelslike}&deg;C<br />
                wind gust: {data.weather.windgust} km/h<br />
                pressure: {data.weather.pressure} hPa<br />
                visibility: {data.weather.visibility} km<br />
                UV index: {data.weather.uvindex} ({data.weather.uv})<br />
            </div>
        </div>
    </>
}