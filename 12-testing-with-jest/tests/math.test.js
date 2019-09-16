const { calculateTip } = require('../src/math');

// test('Hello World!', () => {
//     // This empty test will run successfully.
// });

// test('This should fail...', () => {
//     throw new Error('Failure!');
// });

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);

    if (total !== 13) {
        throw new Error('Total tip should be 13. Got ' + total);
    }
});