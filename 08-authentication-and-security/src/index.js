const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '5 days' });
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse');
    console.log(data);
};

myFunction();