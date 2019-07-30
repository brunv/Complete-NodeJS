const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/121b485e513f0931a1e805a7633c4100/${latitude},${longitude}?units=si`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            });
        }
    });
};

module.exports = forecast;