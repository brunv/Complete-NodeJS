/* This is client-side JavaScript so it can access browser APIs! */

console.log('Client side JS file is loaded!');

// This is asynchronous
fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((parsedData) => {
        if (parsedData.error) {
            console.log(parsedData.error);
        } else {
            console.log(parsedData.location);
            console.log(parsedData.forecast);
        }
    });
});