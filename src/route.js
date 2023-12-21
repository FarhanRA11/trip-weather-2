import { getDistance } from 'geolib';

async function calculateSteps(steps, sa, sn, time13, totalDistance) {
    const fixSteps = []
    const waypoints = steps.length;
    let lat = sa;
    let lng = sn;

    // iterating steps
    for (let step_index = 0; step_index < waypoints; step_index++) {
        // calculate total duration and time cost in each intersection
        const total_duration = steps[step_index].weight * 1000;
        const partial_duration = total_duration / steps[step_index].intersections.length;

        // iterating intersections
        for (let intersection_index = 0; intersection_index < steps[step_index].intersections.length; intersection_index++) {
            const code = `${step_index}/${intersection_index}`;
            // make sure steps not too close to each other
            const x = steps[step_index].intersections[intersection_index].location[1];
            const y = steps[step_index].intersections[intersection_index].location[0];
            const distance = getDistance(
                { latitude: lat, longitude: lng },
                { latitude: x, longitude: y }
            )
            
            if (distance >= (totalDistance / (0.1005 * totalDistance + 2.46231)) * 1000 || step_index === 0 || step_index === waypoints - 1) { // 2000 meter
                lat = x;
                lng = y;

                // create main data structure
                if (step_index === 0) {
                    fixSteps.push({
                        name: 'start',
                        color: 'red',
                        id: code,
                        time: time13,
                        coordinate: [lat, lng],
                        address: '',
                        weather: ''
                    })
                } else if (step_index === waypoints - 1) {
                    fixSteps.push({
                        name: 'destination',
                        color: 'blue',
                        id: code,
                        time: time13,
                        coordinate: [lat, lng],
                        address: '',
                        weather: ''
                    })
                } else {
                    fixSteps.push({
                        name: 'step',
                        color: 'green',
                        id: code,
                        time: time13,
                        coordinate: [lat, lng],
                        address: '',
                        weather: ''
                    })
                }
            }
            time13 += (partial_duration + 5 * 1000);
        }
    }
    return fixSteps;
}

export default async function getRoute(sn, sa, dn, da, time13) {
    try {
        // fetching json data
        const response = await fetch('/api/osrm', {
            method: 'POST',
            headers: {},
            body: `${sn},${sa};${dn},${da}`
        });
        const data = await response.json();
        if (data.code !== 'Ok') {
            alert("Sorry, Can't find the route. Go back and try different point");
            return;
        };

        // gathering the steps into one list
        const allSteps = [];
        const steps = data.routes[0].legs.flatMap(leg => leg.steps);
        allSteps.push(...steps);

        // add start and destination point
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

        return await calculateSteps(allSteps, sa, sn, time13, data.routes[0].distance/1000);
    } catch (error) {   
        console.error('ERROR_route_getRoute_fetch:', error);
    }
}