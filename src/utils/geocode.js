const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFucHJlZXQtc2luZ2giLCJhIjoiY2p5aHFhcXN5MDI1ejNia3pscGMwMW5rNiJ9.n78onTuvAiGQ1QoDgSct2A&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to map services.');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search.');
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    })
}

module.exports = geocode