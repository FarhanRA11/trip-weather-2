import getWeather from './weather';

export default async function getAddress(coords, time13, step_index, code, waypoints, fixSteps) {
    try {
        const response = await fetch('/api/opencage', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: coords
        });
        const data = await response.json();
        const addressComponents = data.results[0].components;

        const list = [
            addressComponents.country,
            addressComponents.state,
            addressComponents.state_district,
            addressComponents.county,
            addressComponents.city,
            addressComponents.city_district,
            addressComponents.town,
            addressComponents.suburb,
            addressComponents.quarter,
            addressComponents.neighbourhood,
            addressComponents.village
        ];

        const pattern = /[^a-zA-Z0-9().,"'\/\s]/;
        let componentsList = [];

        for (let i = 0; i < 11; i++) {
            if (list[i] !== undefined && !pattern.test(list[i])) {
                componentsList.push(list[i]);
                if (componentsList.length === 4) {
                    break;
                }
            }
        }

        const address = componentsList.reverse().join(',');
        let addressList = [];
        if ((!addressList.includes(address) || step_index === waypoints - 1) && address.split(',').length > 2) {
            addressList.push(address);
            const index = fixSteps.findIndex(obj => obj.id === code);
            if (index !== -1) {
                fixSteps[index].address = address.replaceAll(',', ', ');
            }
        }

        await getWeather(time13, code, coords, fixSteps);
    } catch (error) {
        console.error('ERROR_address_getAddress_fetch:', error);
    }
}