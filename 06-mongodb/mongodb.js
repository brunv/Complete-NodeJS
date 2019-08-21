const mongodb = require('mongodb');

// MongoDB configs:
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Connecting to the database:
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // Insert a single document to the 'users' collection:
    // (this is asynchronous)
    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!');
    //     }

    //     // shows the data that have just been inserted:
    //     console.log(result.ops);
    // });

    // insert many documents:
    db.collection('tasks').insertMany([
        {
            description: 'Buy groceries.',
            completed: true
        },
        {
            description: 'Take Andrew Mead\'s NodeJs course.',
            completed: true
        },
        {
            description: 'Start my own projects.',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!');
        }

        console.log(result.ops);
    });
});