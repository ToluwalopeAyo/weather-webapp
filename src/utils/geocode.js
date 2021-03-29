const request = require('request'
)
const geocode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFja25ld3RvbiIsImEiOiJja2pqM2ZlYmI0bHV0MnpucWpmYjEyY3BzIn0.cYWPiwk4-8CgASC9h6_eOA&limit=1`

    request({url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service', undefined)

        }else if (body.features.length === 0){
            callback(`unable to access ${address}  search for another location`, undefined)

        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode


// const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFja25ld3RvbiIsImEiOiJja2pqM2ZlYmI0bHV0MnpucWpmYjEyY3BzIn0.cYWPiwk4-8CgASC9h6_eOA&limit=1"
// request({url: url2, json:true}, (error, response)=>{
    
//     if (error){
//         console.log('Unable to connect to weather service')
//     } else if (response.body.features.length === 0){
//         console.log('No matching result')
//     }else{
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
   


//     // console.log(response.body.features[0].center)
// })

