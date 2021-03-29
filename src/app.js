const path = require('path')  
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//  setup static directory to server 
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) =>{
    res.render('index', {
        title: 'weather',
        name: 'jacob newton'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Jacob newton'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Jacob Newon',
        message: 'cannot access the weather api'
    })
})

// if (!location){
//     console.log('Please provide a location')
// } else{
//     geocode(location, (error, {latitude, longitude, location} = {}) => {
//         if (error){
//             return console.log(error)
//         }
//         forecast(latitude, longitude, (error, forecastdata)=>{
//             if (error){
//                 return console.log(error)
//             }
    
//             console.log(location)
//             console.log(forecastdata)
//         })
       
//     })
// }





app.get('/weather-page', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'provide a location to fetch from'
        })
        
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error}) 
        }forecast(latitude, longitude, (error, forecast)=> {
            if (error){
                return res.send({error})
            }
            res.send({
                address: req.query.address, 
                forecast,
                location
            })
        })
    })
    
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Jacob newton',
        errorType: 'Help article not found.'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        name: 'Jacob newton',
        title: '404',
        errorType: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log(`server is up on port ${port}.`)
})

