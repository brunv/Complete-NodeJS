require('../src/db/mongoose');

const Task = require('../src/models/task');

/* Using Promise Chainning: */

// Task.findByIdAndDelete('5d6676fcc7c8af48c067dc0e').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

/* Using Async/Await: */

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteTaskAndCount('5d65d82442694f439c283cbd').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})