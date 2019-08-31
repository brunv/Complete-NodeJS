const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

// Custom Middleware:
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled.');
//     } else {
//         next();
//     }
// });

app.use((req, res, next) => {
    res.status(503).send('Sorry. We\'re in maintenance. Come back later.');
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});