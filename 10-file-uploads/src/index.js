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
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});