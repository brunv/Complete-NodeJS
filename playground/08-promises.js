/***** CALLBACKS *****/

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error.', undefined);
        callback(undefined, [1, 4, 7]);
    }, 1500);
};

doWorkCallback((error, result) => {
    if (error) {
        return console.log('Callback: ', error);
    }

    console.log('Callback: ', result);
});

/***** PROMISES *****/
/**
 * 
 *                              fulfilled
 *                             /
 * Promise      -- pending -->
 *                             \
 *                               rejected
 */

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7, 4, 1]);
        reject('Things went wrong!');
        // resolve([2, 5, 8]);
    }, 3000);
});

// Only one will work:
doWorkPromise.then((result) => {
    console.log('Success!', result);
}).catch((error) => {
    console.log('Error!', error);
});