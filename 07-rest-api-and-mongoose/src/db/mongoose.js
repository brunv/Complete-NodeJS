const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

/* MODEL */

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

/* MODEL INSTANCE */

// const me = new User({
//     name: 'Bruno',
//     age: 23
// });

const task = new Task({
    description: 'This is the very first task.',
    completed: true
});

/* SAVE DATA */

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error: ', error);
// });

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log('Error: ', error);
});