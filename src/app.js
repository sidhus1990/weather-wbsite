const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const staticPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Manpreet Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Manpreet Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'this paragraph is for help message',
        name: 'Manpreet Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return  res.send({
            error: 'Please provide the address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast:forcastData
            })
        })
    })
    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help',
        name: 'Manpreet Singh',
        errorMessage: 'Help Article Not Found.'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Help',
        name: 'Manpreet Singh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})