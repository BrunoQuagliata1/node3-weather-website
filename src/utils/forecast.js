const request = require('request')


//Geocoding
//Adress -> Lat/Long -> weather
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7ffe251d7e3ef5fe207bd0154c7c79f2&query=' + longitude + ','+ latitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather services!',undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '  + body.current.temperature + ' degrees out. The high today is It feels like '+ body.current.feelslike +' 5 degrees out. The humidity is: '+ body.current.humidity + '%')
        }
    })
}
module.exports = forecast