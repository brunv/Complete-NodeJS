const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
};

beforeEach(async () => {
    // this function runs before each test case in this test suite
    // console.log('BeforeEach');

    // Delete all users:
    await User.deleteMany();

    // Add a default user for testing purposes
    await new User(userOne).save();
});

// afterEach(() => {
//     // this function runs after each test case in this test suite
//     console.log('AfterEach')
// });

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'fake@example.com',
        password: 'IDontExist123'
    }).expect(400);
});