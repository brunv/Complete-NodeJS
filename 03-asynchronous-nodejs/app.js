const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) {
    console.log('Please provide a location.');
} else {
    console.log(`Getting forecast for ${location}...`);

    geocode(location, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, { summary, temperature, precipProbability }) => {
            if (error) {
                return console.log(error);
            }

            console.log(location);
            console.log(`${summary} It is currently ${temperature}°C out. There is a ${precipProbability}% chance of rain.`);
        });
    });
}