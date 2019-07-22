const _ = require('lodash');

const numbers = [33, 45, 13, 2, 88];

_.each(numbers, function (number, i) {
    console.log(number);
});