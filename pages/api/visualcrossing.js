export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { coords, time10 } = req.body;
            const key = process.env.NEXT_PUBLIC_VISUALCROSSING_APIKEY;
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coords}/${time10}?unitGroup=metric&key=${key}&include=current&iconSet=icons2&contentType=json&elements=cloudcover,dew,feelslike,humidity,icon,precip,precipprob,pressure,snow,snowdepth,temp,uvindex,visibility,winddir,windgust,windspeed`;

            const response = await fetch(url, { method: 'GET' });
            if (response.status === 200) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                throw `${response.status}. ${response.statusText}`;       
            }
        } catch (error) {
            console.error('ERROR_visualcrossing_handler_fetch:', error);
            res.status(500).json({ error: error });
        };
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    };
}