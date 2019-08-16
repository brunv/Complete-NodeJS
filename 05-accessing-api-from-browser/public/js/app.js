/* This is client-side JavaScript so it can access browser APIs! */

console.log('Client side JS file is loaded!');

function getWeather(location) {
    // This is asynchronous
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((parsedData) => {
            if (parsedData.error) {
                console.log(parsedData.error);
            } else {
                console.log(parsedData.location);
                console.log(parsedData.forecast);
            }
        });
    });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    getWeather(location);
});