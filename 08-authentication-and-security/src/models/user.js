const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Mongo already creates a schema under the hood when we pass the object
 * directly into model. But doing this separately is going to allow us
 * to take advantage of Middlewares.
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password".');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

/** MODEL METHODS **/

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login.');
    }

    return user;
};

/** INSTANCE METHODS **/

userSchema.methods.toJSON = function () {
    /**
     * Changing this from 'getPublicProfile' to 'toJSON' means we have the
     * exact same behavior any other time we are sending the user back.
     * 
     * How does it even run if we're never explicity calling this from anywhere?
     * Everytime we send a response, Express uses 'JSON.strigify()' under the
     * hood. Whenever that object in response gets stringified it's gonna call
     * the .toJSON method implicitly so all we need to do is to define a
     * functions that will do what we want.
     * 
     */
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    // we need the binding from the user we are passing so no arrow funciton here
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};


// Hash password before saving:
userSchema.pre('save', async function (next) {
    // Arrow functions doesn't work here because it does not bind 'this'.
    const user = this;

    if (user.isModified('password')) {
        // the new hash override the plain text value:
        user.password = await bcrypt.hash(user.password, 8);
    }

    // We simply call 'next()' when we're done:
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;