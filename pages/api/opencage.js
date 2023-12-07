export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const key = process.env.NEXT_PUBLIC_OPENCAGE_APIKEY;
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${req.body}&key=1c33877ef9f14cd18244b064da90632f&language=en&no_annotations=1&address_only=1&limit=1&no_record=1&abbrv=1`;

            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            res.status(200).json(data)
        } catch (error) {
            console.error('ERROR_opencage_handler_fetch:', error);
            req.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}