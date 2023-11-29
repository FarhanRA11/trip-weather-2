import getAddress from "./address";

function calculateSteps(steps, sa, sn, time13, fixSteps) {
    const waypoints = steps.length;
    let lat = sa;
    let lng = sn;

    for (let step_index = 0; step_index < waypoints; step_index++) {
        const total_duration = steps[step_index].weight * 1000;
        const partial_duration = total_duration / steps[step_index].intersections.length;

        for (let intersection_index = 0; intersection_index < steps[step_index].intersections.length; intersection_index++) {
            const code = `${step_index}/${intersection_index}`;
            const x = steps[step_index].intersections[intersection_index].location[1];
            const y = steps[step_index].intersections[intersection_index].location[0];
            const distance = Math.sqrt((x - lat) ** 2 + (y - lng) ** 2, 2);

            if (distance >= 0.02 || step_index === 0 || step_index === waypoints - 1) {
                lat = x;
                lng = y;

                if (step_index === 0) {
                    fixSteps.push({
                        name: 'start',
                        id: code,
                        time: time13,
                        coordinate: {latitude: lat, longitude: lng},
                        address: '',
                        weather: ''
                    })
                } else if (step_index === waypoints - 1) {
                    fixSteps.push({
                        name: 'destination',
                        id: code,
                        time: time13,
                        coordinate: {latitude: lat, longitude: lng},
                        address: '',
                        weather: ''
                    })
                } else {
                    fixSteps.push({
                        name: 'step',
                        id: code,
                        time: time13,
                        coordinate: {latitude: lat, longitude: lng},
                        address: '',
                        weather: ''
                    })
                }

                getAddress(`${lat},${lng}`, time13, step_index, code, waypoints, fixSteps);
            }

            time13 += (partial_duration + 5 * 1000);
        }
    }
}

export default async function getRoute(sn, sa, dn, da, time13, fixSteps) {
    try {
        const response = await fetch('/api/osrm', {
            method: 'POST',
            headers: {},
            body: `${sn},${sa};${dn},${da}`
        });
        const data = await response.json();

        if (data.code !== 'Ok') {
            alert("Sorry, Can't find the route. Go back and try different point");
        };

        const allSteps = [];
        const steps = data.routes[0].legs.flatMap(leg => leg.steps);
        allSteps.push(...steps);

        allSteps.unshift({
            weight: 0,
            intersections: [{
                location: [sn, sa]
            }]
        });
        allSteps.push({
            weight: 0,
            intersections: [{
                location: [dn, da]
            }]
        });

        calculateSteps(allSteps, sa, sn, time13, fixSteps);

    } catch (error) {
        console.error('ERROR_route_getRoute_fetch:', error);
    }
}