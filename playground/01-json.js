const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };

// // object to JSON:
// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);

// // JSON to object:
// const parsedBook = JSON.parse(bookJSON);
// console.log(parsedBook.author);

// // Write out the JSON:
// fs.writeFileSync('01-json.json', bookJSON);

// // Read the JSON file:
// const dataBuffer = fs.readFileSync('01-json.json');
// // const dataJSON = dataBuffer.toString();
// // const data = JSON.parse(dataJSON);
// const data = JSON.parse(dataBuffer);
// console.log(data.title);

/* Exercise: */
const dataBuffer = fs.readFileSync('01-exercise.json');
const user = JSON.parse(dataBuffer);

user.name = 'Bruno';
user.age = '23';

const userJSON = JSON.stringify(user);
fs.writeFileSync('01-exercise.json', userJSON);