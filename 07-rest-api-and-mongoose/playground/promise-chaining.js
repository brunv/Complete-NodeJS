require('../src/db/mongoose');

const User = require('../src/models/user');

// Using promise chain to do one thing after another.
// In this case we're updating an specific user and looking for
// users that has the age = 1.

// User.findByIdAndUpdate('5d6684e90209ce525873e526', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e);
// });

// This is the same thing up above but instead of Promise Chaining
// we're using Async/Await:

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};

updateAgeAndCount('5d6684e90209ce525873e526', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})