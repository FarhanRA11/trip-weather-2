function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function descUV(index) {
    if (index < 2.5) return 'Low';
    else if (index >= 2.5 && index < 5.5) return 'Moderate';
    else if (index >= 5.5 && index < 7.5) return 'High';
    else if (index >= 7.5 && index < 10.5) return 'Very-High';
    else return 'Extreme';
}

export default async function getWeather(steps) {
    try {
        if (steps === 'error') throw 'error';

        for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
            // fetching json data
            const requestBody = JSON.stringify({
                coords: `${steps[stepIndex].coordinate[0]},${steps[stepIndex].coordinate[1]}`, // lat,lng
                time10: Math.round(steps[stepIndex].time / 1000)
            })
            const response = await fetch('api/visualcrossing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: requestBody
            })
            if (response.status !== 200) throw new Error(`${response.status}. ${response.statusText}`);
            const data = await response.json();
            const weatherComponents = data.currentConditions;
            const weather = {
                cloudcover: weatherComponents.cloudcover,
                feelslike: weatherComponents.feelslike,
                humidity: weatherComponents.humidity,
                text: weatherComponents.icon, // main
                precip: weatherComponents.precip,
                precipprob: weatherComponents.precipprob, // main
                pressure: weatherComponents.pressure,
                snow: weatherComponents.snow,
                snowdepth: weatherComponents.snowdepth,
                temp: weatherComponents.temp, // main
                uvindex: weatherComponents.uvindex * 11 / 10,
                visibility: weatherComponents.visibility,
                winddir: weatherComponents.winddir,
                windgust: weatherComponents.windgust,
                windspeed: weatherComponents.windspeed, // main
            }
            weather.title = titleCase(weather.text.replaceAll('-', ' ')) //
            weather.uv = descUV(weather.uvindex)

            // insert weather data in each route steps
            const index = steps.findIndex(obj => obj.id === steps[stepIndex].id);
            if (index !== -1) steps[index].weather = weather;
        }

        // check all route steps had weather and returning it
        steps = steps.filter(obj => obj.weather !== '');
        return steps;
    } catch (error) {
        console.error('ERROR_weather_getWeather_fetch:', error);
        return error;
    }
}