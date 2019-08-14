const path = require('path');
const express = require('express');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// app.get('/help', (req, res) => {
//     // sending back JSON
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah',
//         age: 34
//     }
//     ]);
// });

// app.get('/about', (req, res) => {
//     // sending back HTML
//     res.send('<h2>This is the about page!</h2>');
// });

app.get('/weather', (req, res) => {
    res.send({
        location: 'Philly',
        forecast: 'Beatiful sunny day.'
    });
});

app.listen(3000, () => {
    console.log('Up and running on port 3000!');
});