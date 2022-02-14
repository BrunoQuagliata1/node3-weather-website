const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
//set the port on heroku
//the port will be equal to the first value if it exist or 3000 if it doesnt exist
//meaning it will work locally if we dont have heroku
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbag engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bruno Quagliata'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Aboutt',
        name: 'Bruno Quagliata'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpT: 'Nos vimo',
        title: 'Help',
        name: 'Bruno Quagliata'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide  a search term'
        })
    } 
        console.log(req.query)
        res.send({
        products: [] 
    }) 
})


app.get('/help/*', (req,res) =>{
    res.render('404page', {
        title: '404',
        name: 'Bruno',
        help: 'help article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404page', {
        title: '404',
        name: 'Bruno',
        help: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port 3000.')
})

