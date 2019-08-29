require('../src/db/mongoose');

const User = require('../src/models/user');

// Using promise chain to do one thing after another.
// In this case we're updating an specific user and looking for
// users that has the age = 1.
User.findByIdAndUpdate('5d6684e90209ce525873e526', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e);
});