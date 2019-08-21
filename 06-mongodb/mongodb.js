const mongodb = require('mongodb');

// MongoDB configs:
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

// Connecting to the database:
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

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
});