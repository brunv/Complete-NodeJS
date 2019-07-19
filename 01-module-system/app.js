// Importing the File System Core Module
const fs = require('fs');
const add = require('./utils.js');
const getNotes = require('./notes.js');
// Importing NPM modules
const validator = require('validator');

// Create and override the file
fs.writeFileSync('notes.txt', 'This file was modified by Node.js!');

// Append to a file
fs.appendFileSync('notes.txt', '\nLet\'s append that.');

// console.log(name);
console.log(add(3, 5));
console.log(getNotes());

// using 'validator' module
console.log(validator.isEmail('developer.brunv@gmail.com'));
console.log(validator.isEmail('developer.brunvgmail.com'));

console.log(validator.isURL('http://brunv.com'));