const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
})

/**
 * Mongo already creates a schema under the hood when we pass the object
 * directly into model. But doing this separately is going to allow us
 * to take advantage of Middlewares.
 */

// Runs a specific function before 'save':
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