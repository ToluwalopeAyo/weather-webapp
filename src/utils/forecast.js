const request = require('request')


const forecast = (latitude, longitude, callback) =>{
    const url  = `http://api.weatherstack.com/current?access_key=578064776e0326feba7257cc9fc40488&query=${encodeURIComponent(longitude, latitude)}&units=f`
    request({url, json:true}, (error, {body}) =>{
        if (error){
            callback('unable to connect to the weather services')

        } else if (body.error){
            callback(`Unable to access the longitude:  ${longitude} and the latitude: ${latitude} for the location`)
        }else{
            callback(undefined, {
                // longitude: longitude,
                //  latitude : latitude,
                forecast: `It is Currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain`

            })
        }
    })
}

module.exports = forecast


// const url = 'http://api.weatherstack.com/current?access_key=578064776e0326feba7257cc9fc40488&query=37.8267,-122.4233&units=f'

// request({url: url, json:true}, (error, response) =>{
//     // console.log(response)
//     // console.log(response.body.current)
//     if (error){
//         console.log('unable to connect to weather service')
//     }else if (response.body.error) {
//         console.log('Unable to find location')
//     }else{
//         console.log(`It is Currently ${response.body.current.temperature} degrees out. There is ${response.body.current.precip}% chance of rain `)

//     }
//     // console.log(error)
// })

// Goal: Create a reusable function for getting the forecast
// setup the "forcast" function in utils/forecast.js
// require the function in app.js and call it as shown below
// the forecast function should have three potential calls to callbacks:
    // - low level error, pass string for error
    // - Coordinate error, pass string for error
    // - Success, pass forecast string for data (same format as from before)
