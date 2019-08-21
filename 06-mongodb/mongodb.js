const mongodb = require('mongodb');

// MongoDB configs:
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log(id);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

// Connecting to the database:
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    /* CREATE */

    // Insert a single document to the 'users' collection:
    // (this is asynchronous)
    // db.collection('users').insertOne({
    //     // _id: id,
    //     name: 'Grace',
    //     age: 29
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!');
    //     }

    //     // shows the data that have just been inserted:
    //     console.log(result.ops);
    // });

    // insert many documents:
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Buy groceries.',
    //         completed: true
    //     },
    //     {
    //         description: 'Take Andrew Mead\'s NodeJs course.',
    //         completed: true
    //     },
    //     {
    //         description: 'Start my own projects.',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result.ops);
    // });

    /* READ */

    db.collection('tasks').findOne({
        _id: new ObjectID("5d5cac826dafaa3d7c3ef110")
    }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch.');
        }

        if (task === null) {
            console.log('No results.');
        } else {
            console.log(task);
        }

    });

    /**
     * 'find()' doesn't take in a callback as that second argument like other
     * methods.What we get back as the return value is actually a 'cursos' and
     * the 'cursor' is not the data we're asking for. It is a pointer to that 
     * data in the database.
     * And the reason we're getting a cursos back is that Mongo isn't going to
     * assume that every time you use find you always want to get back an array
     * of all of those documents. There are a lot of other things you might
     * want so when we get a cursor back it opens a lot more possibilities.
     * To work with it we just have to chain another mathod. Check documentation.
     */
    db.collection('tasks').find({ completed: false }).toArray((error, task) => {
        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).count((error, count) => {
        console.log(count);
    });
});