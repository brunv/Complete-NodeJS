const request = require('request');

const url = 'https://api.darksky.net/forecast/121b485e513f0931a1e805a7633c4100/37.8267,-122.4233?units=si';

request({ url: url, json: true }, (error, response) => {
    const data = response.body;
    currentForecast(data);
});

function currentForecast(data) {
    const { temperature, precipProbability } = data.currently;
    const { summary } = data.daily.data[0];
    const forecast = `${summary}. It is currently ${temperature}ºC degrees out. There is a ${precipProbability}% chance of rain.`;
    console.log(forecast);
}