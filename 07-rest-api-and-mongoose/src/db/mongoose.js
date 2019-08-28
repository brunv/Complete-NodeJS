const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

/* MODEL */

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password".');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

/* MODEL INSTANCE */

// const me = new User({
//     name: 'Bruno',
//     password: 'm1pH0n3',
//     email: 'bruno_vieira95@hotmail.com',
//     age: 23
// });

const task = new Task({
    description: 'This is a new task.',
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