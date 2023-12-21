import { utils, writeFile } from 'sheetjs-style';
import formatTime from './timeFormat';

// [num, address, coords, datetime, 15*img], [4*null, 15*data]
// worksheet['!merges'].push(
//     { s: { c: 0, r: num*2+1 }, e: { c: 0, r: num*2+2 } },   // A3:A4
//     { s: { c: 1, r: num*2+1 }, e: { c: 1, r: num*2+2 } },   // B3:B4
//     { s: { c: 2, r: num*2+1 }, e: { c: 2, r: num*2+2 } },   // C3:C4
//     { s: { c: 3, r: num*2+1 }, e: { c: 3, r: num*2+2 } }    // D3:D4
// );
// worksheet['!rows'].push({ hpx: 42 }, { hpx: 42 })

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


export default async function exportToExcel(data) {
    // console.log(await toDataURL('/components/cloud.png'));
    // create new book
    const workbook = utils.book_new();
    const template = [
        ['steps', 'address', 'coordinate (lat, lng)', 'date time', 'condition', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 'weather', 'cloud cover', 'feels like', 'humidity', 'precipitation', 'rain probability', 'pressure', 'snow', 'snow depth', 'temperature', 'uv index', 'visibility', 'wind direction', 'wind gust', 'wind speed']
    ];

    // push data (params) to template
    for (let i = 0; i < data.length; i++) {
        template.push(
            [
                i + 1, data[i].address, (data[i].coordinate).join(', '), formatTime(data[i].time),
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png',
                '/components/cloud.png'
            ],
            [
                null, null, null, null,
                data[i].weather.title,
                data[i].weather.cloudcover,
                data[i].weather.feelslike,
                data[i].weather.humidity,
                data[i].weather.precip,
                data[i].weather.precipprob,
                data[i].weather.pressure,
                data[i].weather.snow,
                data[i].weather.snowdepth,
                data[i].weather.temp,
                data[i].weather.uvindex,
                data[i].weather.visibility,
                data[i].weather.winddir,
                data[i].weather.windgust,
                data[i].weather.windspeed
            ]
        );
    }

    // create new sheet
    const worksheet = utils.aoa_to_sheet(template);

    worksheet['!merges'] = [
        { s: { c: 0, r: 0 }, e: { c: 0, r: 1 } },   // A1:A2
        { s: { c: 1, r: 0 }, e: { c: 1, r: 1 } },   // B1:B2
        { s: { c: 2, r: 0 }, e: { c: 2, r: 1 } },   // C1:C2
        { s: { c: 3, r: 0 }, e: { c: 3, r: 1 } },   // D1:D2
        { s: { c: 4, r: 0 }, e: { c: 18, r: 0 } }   // E1:S1
    ];
    worksheet['!cols'] = [
        { width: 8 }, { width: 22 }, { width: 24 }, { width: 20 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }, { width: 10.3 }
    ];
    worksheet['!rows'] = [{ hpx: 14.4 }, { hpx: 28.8 }];

    // add new merge cell based on data
    for (let i = 1; i <= data.length; i++) {
        worksheet['!merges'].push(
            { s: { c: 0, r: i * 2 }, e: { c: 0, r: i * 2 + 1 } },
            { s: { c: 1, r: i * 2 }, e: { c: 1, r: i * 2 + 1 } },
            { s: { c: 2, r: i * 2 }, e: { c: 2, r: i * 2 + 1 } },
            { s: { c: 3, r: i * 2 }, e: { c: 3, r: i * 2 + 1 } }
        );
        worksheet['!rows'].push({ hpx: 42 }, { hpx: 42 });
    }

    // styling
    for (const [key, value] of Object.entries(worksheet)) {
        if (!key.startsWith('!') && key.length == 2) {
            value.s = {
                font: { sz: 11 },
                alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
            };
            if ((key.endsWith('1') || key.endsWith('2')) && key.length == 2) {
                value.s.font.bold = true;
            }
        }
    }

    // finishing and trigger download
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    console.log(worksheet)

    const fileName = 'trip 1';
    writeFile(workbook, `trip-weather_${fileName.replaceAll(' ', '-')}.xlsx`, { bookType: 'xlsx', type: 'blob', cellStyles: true });
}