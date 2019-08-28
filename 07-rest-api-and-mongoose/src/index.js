const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

app.use(express.json());

app.get('/users', (req, res) => {
    // Fetch all users:
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    // console.log(req.params);
    const _id = req.params.id;

    // Fetch an specific user by id:
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('User not found!');
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.post('/users', (req, res) => {
    // Create user with the request data:
    const user = new User(req.body);

    // Save the new user to DB:
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send('Task not found!');
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});