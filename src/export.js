import { utils, writeFile } from 'sheetjs-style';
import formatTime from './timeFormat';

export default async function exportToExcel(data) {
    // create new book
    const workbook = utils.book_new();
    const template = [
        ['steps', 'address', 'coordinate\n(lat, lng)', 'date time', 'condition', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 'weather', 'cloud cover', 'feels like', 'humidity', 'precipitation', 'rain probability', 'pressure', 'snow', 'snow depth', 'temperature', 'uv index', 'visibility', 'wind direction', 'wind gust', 'wind speed']
    ];

    // push data (params) to template
    for (let i = 0; i < data.length; i++) {
        template.push(
            [
                i + 1, data[i].address, (data[i].coordinate).join(', '), formatTime(data[i].time),
                data[i].weather.title,
                data[i].weather.cloudcover + '%',
                data[i].weather.feelslike + '\u00B0C',
                data[i].weather.humidity + '%',
                data[i].weather.precip + ' mm',
                data[i].weather.precipprob + '%',
                data[i].weather.pressure + ' hPa',
                data[i].weather.snow + ' cm',
                data[i].weather.snowdepth + ' cm',
                data[i].weather.temp + '\u00B0C',
                `${data[i].weather.uvindex}\n(${data[i].weather.uv.replaceAll('-', ' ')})`,
                data[i].weather.visibility + ' km',
                data[i].weather.winddir + '\u00B0',
                data[i].weather.windgust + ' km/h',
                data[i].weather.windspeed + ' km/h'
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
        worksheet['!rows'].push({ hpx: 80 });
    }

    // styling
    for (const [key, value] of Object.entries(worksheet)) {
        if (!key.startsWith('!')) {
            value.s = {
                font: { sz: 11 },
                alignment: { wrapText: true, vertical: 'center', horizontal: 'center' },
                // border: {
                //     top: { style: 'medium', color: { rgb: '000000' } },
                //     right: { style: 'medium', color: { rgb: '000000' } },
                //     bottom: { style: 'medium', color: { rgb: '000000' } },
                //     left: { style: 'medium', color: { rgb: '000000' } }
                // }
            };
            if ((key.endsWith('1') || key.endsWith('2')) && key.length == 2) {
                value.s.font.bold = true;
            }
            // if (['F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1'].includes(key)) {
            //     value.s.border.top = { style: 'medium', color: { rgb: '000000' } };
            //     if (key === 'S1') {
            //         value.s.border.right = { style: 'medium', color: { rgb: '000000' } };
            //     };
            // };
            // if (['A2', 'B2', 'C2', 'D2'].includes(key)) {
            //     value.s.border.left = { style: 'medium', color: { rgb: '000000' } };
            // };
        };
    };

    // finishing and trigger download
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    console.log(worksheet);

    const fileName = 'trip 1';
    writeFile(workbook, `trip-weather_${fileName.replaceAll(' ', '-')}.xlsx`, { bookType: 'xlsx', type: 'blob', cellStyles: true });
}