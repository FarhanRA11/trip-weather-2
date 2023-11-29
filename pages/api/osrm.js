export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${req.body}?overview=full&steps=true&annotations=true&alternatives=true`
            
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            res.status(200).json(data)
        } catch (error) {
            console.error('ERROR_osrm_handler_fetch:', error)
            req.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}