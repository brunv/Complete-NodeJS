/* ASYNC & AWAIT */

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative!');
            }
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    // return 'Andrew'; // to fulfill the Promise
    // throw new Error('Something went wrong'); // to be catched

    // this is better than Promise Chaining!
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 3);
    return sum3;
};

doWork().then((result) => {
    console.log('result:', result);
}).catch((error) => {
    console.log('error:', error);
})

/**
 * Async Functions:
 * Always returns a Promise.
 * When working with Async/Await you don't have to change how
 * your promosises function internally. All you do is change
 * how you work with them.
 *
 * The 'waits' operator gets used with a promise! That's why
 * we can call the add funciton (because it returns a Promise).
 *
 * The .then() and .catch() call in doWork() works for all the
 * 3 Promises returned from add in the lines 19, 20 and 21.
 */