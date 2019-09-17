const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
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
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201);

    // Assert that the user was inserted in the database correctly:
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response:
    // expect(response.body.user.name).toBe('Andrew'); // this checks up only one property
    expect(response.body).toMatchObject({
        // the properties we list out here do need to match up exactly
        user: {
            name: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('MyPass777!');
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect(user.tokens[1].token).toBe(response.body.token);
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'fake@example.com',
        password: 'IDontExist123'
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    // toEqual() does not use the triple equality operator. Instead it uses
    // na algorithm which is going to look at the properties on the object
    // and compare those:
    // expect({}).toEqual({});
    expect(user.avatar).toEqual(expect.any(Buffer)); // We could use String, Number...
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'May'
        })
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('May');
});

test('Should not update invalid use fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Birmingham'
        })
        .expect(400)
});