const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

app.use(express.json());

app.post('/users', (req, res) => {
    // Create user with the request data:
    const user = new User(req.body);

    // Save the new user to DB:
    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});