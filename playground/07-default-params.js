/* Default Parameters */

const greeter = (name = "your name") => {
    console.log('Hello ' + name);
};

greeter('Andrew');
greeter();