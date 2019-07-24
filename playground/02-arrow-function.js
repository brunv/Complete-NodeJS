/* Functions */

// const square = function (x) {
//     return x * x;
// };

// const square = (x) => {
//     return x * x;
// };

// const square = x => x * x;

// console.log(square(3));

/* Functions in Objects */

// const event = {
//     name: 'Birthday Party',
//     printGuestList: function () {
//         console.log('Guest list for ' + this.name);
//     }
// }

// DOES NOT WORK!
// const event = {
//     name: 'Birthday Party',
//     printGuestList: () => {
//         console.log('Guest list for ' + this.name);
//     }
// }

// This is NOT an arrow function, just another syntax:
const event = {
    name: 'Birthday Party',
    guestList: ['Andew', 'Jen', 'Mike'],
    printGuestList() {
        // const that = this;

        console.log(`Guest list for ${this.name}:`);
        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending ${this.name}.`);
        });
    }
}

event.printGuestList();

/**
 * Arrow functions don't bind their own 'this' value!!
 * This makes then great candidates for everything except methods.
 */