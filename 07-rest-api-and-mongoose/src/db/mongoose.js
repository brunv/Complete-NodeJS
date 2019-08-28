const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

/* MODEL */

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

/* MODEL INSTANCE */

const me = new User({
    name: 'Bruno',
    age: 23
});

/* SAVE DATA */

me.save().then(() => {
    console.log(me);
}).catch(() => {
    console.log('Error: ', error);
});