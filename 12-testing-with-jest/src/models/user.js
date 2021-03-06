const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

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
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
}
);

/** VIRTUAL PROPERTY **/

// A virtual property is not actual data stored in the database. It's a
// relationship between two entities.
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
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
    /**
     * We're deleting the avatar data of the JSON in response because the data is
     * so large that it can slow down those JSON based requests.
     * We set up a URL that can serve the image up so there's no need to send it
     * back with profile requests.
     */
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    // we need the binding from the user we are passing so no arrow funciton here
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

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

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;