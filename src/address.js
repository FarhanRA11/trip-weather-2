export default async function getAddress(steps) {
    console.log(steps)
    try {
        for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
            // fetching json data
            const response = await fetch('/api/opencage', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: `${steps[stepIndex].coordinate[0]},${steps[stepIndex].coordinate[1]}`
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

            // combine components to be allowed string address
            const pattern = /[^a-zA-Z0-9().,"'\/\s]/;
            let componentsList = [];
            for (let comp = 0; comp < 11; comp++) {
                if (list[comp] !== undefined && !pattern.test(list[comp])) {
                    componentsList.push(list[comp]);
                    if (componentsList.length === 4) {
                        break;
                    }
                }
            }
            const address = componentsList.reverse().join(',');

            // check all address: each must unique, detail enough, and including start & dest point 
            let addressList = [];
            if ((!addressList.includes(address) || stepIndex === steps.length - 1) && address.split(',').length > 2) {
                addressList.push(address);
                const index = steps.findIndex(obj => obj.id === steps[stepIndex].id);
                if (index !== -1) {
                    steps[index].address = address.replaceAll(',', ', ');
                }
            }
        }

        // check all route steps had address and returning it
        steps = steps.filter(obj => obj.address !== '');
        return steps;
    } catch (error) {
        console.error('ERROR_address_getAddress_fetch:', error);
    }
}