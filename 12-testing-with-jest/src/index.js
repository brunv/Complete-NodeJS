const app = require('./app');
const port = process.env.PORT;  // Heroku or local

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});