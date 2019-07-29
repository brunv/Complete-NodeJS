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

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnJ1bnYiLCJhIjoiY2p5b2pqb3pnMDBoMTNjcnpmZTNzZWk5biJ9.dlnyZ7KZwHhjoQlRlJTvEw';

request({ url: geocodeURL, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
});