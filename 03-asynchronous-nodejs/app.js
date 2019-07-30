const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) {
    console.log('Please provide a location.');
} else {
    console.log('Getting forecast for ' + location + '...');

    geocode(location, (error, data) => {
        if (error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }

            console.log(data.location);
            console.log(`${forecastData.summary} It is currently ${forecastData.temperature}°C out. There is a ${forecastData.precipProbability}% chance of rain.`);
        });
    });
}