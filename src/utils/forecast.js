const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/52bbcb3857543e8c95b858822d026559/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.');
        } else if (body.error) {
            callback('Unable to find location. Please try another search.');
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree celcius. The high today is '+ body.daily.data[0].temperatureHigh +' with a low of '+ body.daily.data[0].temperatureHigh+'. There is a '+ body.currently.precipProbability+'% chance of rain.');
        }
    })
}

module.exports = forecast