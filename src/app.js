const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utill/geocode');
const weather = require('./utill/weather')
const app = express()
// define path for express config
const filePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(filePath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'okechukwu',

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'okechukwu'

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'okechukwu'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please input address location'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        weather(data.latitude, data.longitude, (error, forcast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast,
                location: data.location,
                address: req.query.address
            })
        })

    })







})
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404 page',
        error: 'Help article not found',
        name: 'Okechukwu'
    })
})
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        error: 'This is an error page',
        name: 'Okechukwu'

    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000');

})