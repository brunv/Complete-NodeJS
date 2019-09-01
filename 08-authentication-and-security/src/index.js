const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // Get task's owner:
    // const task = await Task.findById('5d6b2f17ffd2d21a687990e5');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    // Get user's tasks:
    const user = await User.findById('5d6b2e075c4e7746d8b0dd28');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();