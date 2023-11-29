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

        const village = addressComponents.village;
        const neighbourhood = addressComponents.neighbourhood;
        const quarter = addressComponents.quarter;
        const suburb = addressComponents.suburb;
        const town = addressComponents.town;
        const cityDistrict = addressComponents.city_district;
        const city = addressComponents.city;
        const county = addressComponents.county;
        const stateDistrict = addressComponents.state_district;
        const state = addressComponents.state;
        const country = addressComponents.country;

        const list = [country, state, stateDistrict, county, city, cityDistrict, town, suburb, quarter, neighbourhood, village];
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
                fixSteps[index].address = address.replaceAll(',',', ');
            }
        }

        getWeather(address.replaceAll(',',', '), time13, step_index, code, coords, waypoints, fixSteps);
    } catch (error) {
        console.error('ERROR_address_getAddress_fetch:', error);
    }
}