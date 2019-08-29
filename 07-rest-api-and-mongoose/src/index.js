const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

app.use(express.json());

/** Routes for Users **/

app.get('/users', async (req, res) => {
    // Fetch all users (async/await):
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
    // Promise Chaining:
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

app.get('/users/:id', async (req, res) => {
    // console.log(req.params);
    const _id = req.params.id;

    // Fetch an specific user by id (async/await):
    try {
        const user = await User.findById(_id);

        // When a valid id is entered, but isn't found in database,
        // mongoose returns a empty response. So:
        if (!user) {
            return res.status(404).send('User not found!');
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
    // Promise Chaining:
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send('User not found!');
    //     }
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

app.post('/users', async (req, res) => {
    // Create user with the request data:
    const user = new User(req.body);

    // Save the new user to DB (await):
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
    // Promise Chaining:
    // Save the new user to DB (promise chain):
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

app.patch('/users/:id', async (req, res) => {
    /**
     * In general the routes for updating resources are the most complex.
     */

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    /**
     * Mongoose already ignores any update that does not have a correspondent
     * property in the Model. What we're doing here is to provide the user a
     * proper feedback about what is happening.
     */
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(404).send(e);
    }
});

/** Routes for Tasks **/

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send('Task not found!');
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // When a valid id is entered, but isn't found in database,
        // mongoose returns a empty response. So:
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});