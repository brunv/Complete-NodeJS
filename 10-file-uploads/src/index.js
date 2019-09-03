const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;  // Heroku or local

// Example of file upload:
const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document.'))
        }

        cb(undefined, true);

        // Calbacks:
        // cb(new Error('File must be a PDF.'));   // send error back
        // cb(undefined, true);    // no error and accepts upload
        // cb(undefined, false);   // no error and rejects upload
    }
});
// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware!');
// };
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    // It's important that we provide all four of these, so express knows
    // that this function is designed to handle errors.
    res.status(400).send({ error: error.message });
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});