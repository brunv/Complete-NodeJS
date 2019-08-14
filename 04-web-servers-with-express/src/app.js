const path = require('path');
const express = require('express');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

// configuring express to use the view engine HBS so with we can render handlebars:
app.set('view engine', 'hbs');
// static pages:
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
        message: 'I hope this page can help you...'
    })
});

app.get('/weather', (req, res) => {
    res.send({
        location: 'Philly',
        forecast: 'Beatiful sunny day.'
    });
});

app.listen(3000, () => {
    console.log('Up and running on port 3000!');
});