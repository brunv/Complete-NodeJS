// Importing the File System Core Module
const fs = require('fs');

// Create and override the file
fs.writeFileSync('notes.txt', 'This file was modified by Node.js!');

// Append to a file
fs.appendFileSync('notes.txt', '\nLet\'s append that.');