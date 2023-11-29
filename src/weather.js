function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function descUV(index) {
    if (index < 2.5) {
        return 'Low';
    } else if (index >= 2.5 && index < 5.5) {
        return 'Moderate';
    } else if (index >= 5.5 && index < 7.5) {
        return 'High';
    } else if (index >= 7.5 && index < 10.5) {
        return 'Very-High';
    } else {
        return 'Extreme';
    }
}

export default async function getWeather(address, time13, step_index, code, coords, waypoints, fixSteps) {
    fixSteps = fixSteps.filter(obj => obj.address !== '');
    try {
        const response = await fetch('api/visualcrossing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coords: coords, time10: Math.round(time13 / 1000) })
        })
        const data = await response.json();
        const weatherComponents = data.currentConditions;

        const weather = {
            cloudcover: weatherComponents.cloudcover,
            feelslike: weatherComponents.feelslike,
            humidity: weatherComponents.humidity,
            text: weatherComponents.icon, //
            precip: weatherComponents.precip,
            precipprob: weatherComponents.precipprob, //
            pressure: weatherComponents.pressure,
            snow: weatherComponents.snow,
            snowdepth: weatherComponents.snowdepth,
            temp: weatherComponents.temp, //
            uvindex: weatherComponents.uvindex * 11 / 10,
            visibility: weatherComponents.visibility,
            winddir: weatherComponents.winddir,
            windgust: weatherComponents.windgust,
            windspeed: weatherComponents.windspeed, //
        }

        weather.title = titleCase(weather.text.replaceAll('-', ' ')) //
        weather.uv = descUV(weather.uvindex)

        const index = fixSteps.findIndex(obj => obj.id === code);
        if (index !== -1) {
            fixSteps[index].weather = weather;
        }
    } catch (error) {
        console.error('ERROR_weather_getWeather_fetch:', error);
    }
}