import { useContext } from "react";
import { resultContext } from "@/pages/result";

export default function AllDetails() {
    const { finalResult } = useContext(resultContext);

    return <>
        <div>
            {finalResult.map(obj => (
                <div className="m-5" key={obj.id}>
                    {obj.address}<br />
                    {obj.weather.title}<br />
                    {new Date(obj.time).toLocaleString(
                        'en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                        hour12: false
                    })}<br />
                    {JSON.stringify(obj.weather, null, 2)}
                </div>
            ))}
        </div>
    </>
}