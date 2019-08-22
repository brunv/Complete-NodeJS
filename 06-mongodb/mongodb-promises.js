const mongodb = require('mongodb');

// MongoDB configs:
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    /** UPDATE **/

    db.collection('users').updateOne({
        _id: new ObjectID("5d5c716583a3c85074efdfe8")
    }, {
            // $set: {
            //     name: 'May'
            // }
            $inc: {
                age: 1
            }
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    db.collection('tasks').updateMany({
        completed: false
    }, {
            $set: {
                completed: true
            }
        }
    ).then((result) => {
        console.log(result.modifiedCount);
    }).catch((error) => {
        console.log(error);
    });

    /** DELETE **/

    db.collection('users').deleteMany({
        age: 29
    }).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(error);
    });

    db.collection('tasks').deleteOne({
        description: 'Buy groceries.'
    }).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(result);
    });
});