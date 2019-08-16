/* This is client-side JavaScript so it can access browser APIs! */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

console.log('Client side JS file is loaded!');

function getWeather(location) {
    // This is asynchronous
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((parsedData) => {

            if (parsedData.error) {
                console.log(parsedData.error);
                messageOne.textContent = parsedData.error;
            } else {
                console.log(parsedData.location);
                messageOne.textContent = parsedData.location;
                console.log(parsedData.forecast);
                messageTwo.textContent = parsedData.forecast;
            }
        });
    });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    getWeather(location);
});