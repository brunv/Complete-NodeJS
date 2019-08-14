const express = require('express');

const app = express();

app.get('', (req, res) => {
    // sending back HTML
    res.send('<h1>Hello express!</h1>');
});

app.get('/help', (req, res) => {
    // sending back JSON
    res.send([{
        name: 'Andrew',
        age: 27
    }, {
        name: 'Sarah',
        age: 34
    }
    ]);
});

app.get('/about', (req, res) => {
    res.send('<h2>This is the about page!</h2>');
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