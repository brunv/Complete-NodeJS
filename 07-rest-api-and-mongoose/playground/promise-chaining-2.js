require('../src/db/mongoose');

const Task = require('../src/models/task');

Task.findByIdAndDelete('5d6676fcc7c8af48c067dc0e').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});