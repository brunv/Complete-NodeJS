const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math');

// test('Hello World!', () => {
//     // This empty test will run successfully.
// });

// test('This should fail...', () => {
//     throw new Error('Failure!');
// });

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);

    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }

    // Using expect:
    expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
});

// Example of asynchronous test:
// test('Async test demo.', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

/**
 * Example of asynchronous test with promises or async/await:
 */
test('Should add two numbers!', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

// Common approach:
test('Should add two number async/await.', async () => {
    const sum = await add(10, 15);
    expect(sum).toBe(25);
});