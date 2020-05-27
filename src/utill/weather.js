const request = require('request')

const weather = (lat, long, callback) => {
    const url = `http://api.weatherunlocked.com/api/current/${lat},${long}?app_id=4f07d55b&app_key=6b0d0b421e1289dfb50f8cb2cb0ddce8`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather app', undefined)
        }
        else {
            callback(undefined, `${body.wx_desc} with ${body.temp_c} degree, ${body.temp_f}fahrenheit today and has a wind speed of ${body.windspd_kmh}km/hr `
            )
        }



    })
}

module.exports = weather