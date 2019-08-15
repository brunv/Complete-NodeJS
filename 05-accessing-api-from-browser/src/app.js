const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve:
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    // rendering handlebars template and passing contents to the view:
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'brunv'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: ' Help',
        message: 'I hope this page can help you...',
        name: 'brunv'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide a address'
        });
    }

    const { address } = req.query;

    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, { summary, temperature, precipProbability }) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecast: summary,
                temperature,
                precipProbability
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'brunv'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'brunv'
    });
});

app.listen(3000, () => {
    console.log('Up and running on port 3000!');
});