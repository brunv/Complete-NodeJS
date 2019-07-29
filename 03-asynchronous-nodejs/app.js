const request = require('request');

const url = 'https://api.darksky.net/forecast/121b485e513f0931a1e805a7633c4100/37.8267,-122.4233';

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
});