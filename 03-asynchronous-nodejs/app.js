const request = require('request');
const geocode = require('./utils/geocode');

// const url = 'https://api.darksky.net/forecast/121b485e513f0931a1e805a7633c4100/37.8267,-122.4233?units=si';
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Philadelphia.json?access_token=pk.eyJ1IjoiYnJ1bnYiLCJhIjoiY2p5b2pqb3pnMDBoMTNjcnpmZTNzZWk5biJ9.dlnyZ7KZwHhjoQlRlJTvEw';

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find location.');
//     } else {
//         const { temperature, precipProbability } = response.body.currently;
//         const { summary } = response.body.daily.data[0];
//         const forecast = `${summary}. It is currently ${temperature}°C degrees out. There is a ${precipProbability}% chance of rain.`;
//         console.log(forecast);
//     }
// });

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the location service!');
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search');
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
//     }
// });

geocode('Chicago', (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);
});