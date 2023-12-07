import { useState } from 'react';
import Image from 'next/image'

export const Accordion = props => {
    const [data, setData] = useState(props.data);
    const expandAccordion = () => {
        let newActive = data.active === 1 ? 0 : 1;
        setData({ ...data, active: newActive });
    }

    return <>
        <div id={data.id} className={`bg-[#e9e9e9] flex flex-col p-5 border border-[#c9c6c655] rounded-md w-full duration-500 group ${data.active === 1 ? 'expand' : ''}`}>
            <div className="w-full text-center gap-y-2 text-base flex flex-col items-center duration-500 group-[.expand]">
                {/* location and time */}
                <p>{data.address}</p>
                <p>
                    {new Date(data.time).toLocaleString(
                        'en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                        hour12: false
                    })}
                </p>

                {/* main components */}
                <div className='grid grid-cols-2 text-sm gap-4 w-full'>
                    <div className='flex flex-col items-center'>
                        <Image src={`/icons/${data.weather.text}.png`} alt='icon' width={50} height={50} priority />
                        {data.weather.title}
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src='/components/rainprob.png' alt='rainprob' width={50} height={50} priority />
                        <span>Rain</span>{data.weather.precipprob}%
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src={`/components/temp-${Math.floor(data.weather.temp / 10 + 1)}.png`} alt='temp' width={50} height={50} priority />
                        <span>Temperature</span>{data.weather.temp}&deg;C
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src='/components/wind.png' alt='wind' width={50} height={50} priority />
                        <span>Wind</span>
                        <div className='flex items-center '>
                            <div><Image src='/components/wind-dir.png' alt='wind-dir' width={25} height={25} priority style={{ transform: `rotate(${Math.round(data.weather.winddir)}deg)` }} /></div>
                            {data.weather.windspeed} km/h
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={expandAccordion} className='text-end'><div className='text-3xl duration-500 cursor-pointer inline-block group-[.expand]:rotate-[135deg]'>+</div></div>
            
            {/* more components */}
            <div className="text-sm overflow-hidden max-h-0 group-[.expand]:max-h-[520px] duration-500 grid grid-cols-2 gap-4">
                <div className='flex flex-col items-center'>
                    <Image src='components/precip.png' alt='precipitation' width={50} height={50} priority />
                    <span>Precipitation</span>{data.weather.precip} mm
                </div>
                <div className='flex flex-col items-center'>
                    <Image src='/components/cloud.png' alt='cloudcover' width={50} height={50} priority />
                    <span>Cloud Cover</span>{data.weather.cloudcover}%
                </div>
                <div className='flex flex-col items-center'>
                    <Image src='/components/humidity.png' alt='humidity' width={50} height={50} priority />
                    <span>Humidity</span>{data.weather.humidity}%
                </div>
                <div className='flex flex-col items-center'>
                    <Image src='/components/snow.png' alt='snow' width={50} height={50} priority />
                    <span>Snow</span>{data.weather.snow} cm
                </div>
                <div className='flex flex-col items-center'>
                    <Image src='/components/snowdep.png' alt='snowdepth' width={50} height={50} priority />
                    <span>Snow Depth</span>{data.weather.snowdepth} cm
                </div>
                <div className='flex flex-col items-center'>
                    <Image src={`/components/feel-${Math.floor(data.weather.feelslike / 10 + 1)}.png`} alt='feelslike' width={50} height={50} priority />
                    <span>Feelslike</span>{data.weather.feelslike}&deg;C
                </div>
                <div className='flex flex-col items-center'>
                    <Image src={`/components/windgust.png`} alt='windgust' width={50} height={50} priority />
                    <span>Wind Gust</span>{data.weather.windgust} km/h
                </div>
                <div className='flex flex-col items-center'>
                    <Image src={`/components/pressure.png`} alt='pressure' width={50} height={50} priority />
                    <span>Pressure</span>{data.weather.pressure} hPa
                </div>
                <div className='flex flex-col items-center'>
                    <Image src={`/components/visibility.png`} alt='visibility' width={50} height={50} priority />
                    <span>Visibility</span>{data.weather.visibility} km
                </div>
                <div className='flex flex-col items-center'>
                    <Image src={`/components/uv-${data.weather.uv}.png`} alt='uvindex' width={50} height={50} priority />
                    <span>UV Index</span>{data.weather.uvindex} ({(data.weather.uv).replaceAll('-', ' ')})<br />
                </div>
            </div>
        </div>
    </>
}