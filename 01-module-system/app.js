// Importing the File System Core Module
const fs = require('fs');
const add = require('./utils.js');
const getNotes = require('./notes.js');

// Create and override the file
fs.writeFileSync('notes.txt', 'This file was modified by Node.js!');

// Append to a file
fs.appendFileSync('notes.txt', '\nLet\'s append that.');

// console.log(name);
console.log(add(3, 5));
console.log(getNotes());