const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');

const router = new express.Router();
const upload = multer({
    // dest: 'images/avatar',
    // When removing 'dest' the multer library is no longer going to save
    // images to the given directory. Instaead it's simply going to pass that
    // through to our function se we can do something with it.
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be .jpeg .jpg .png'));
        }

        cb(undefined, true);
    }
});

// Add 'auth' middleware:
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    /**
     * In general the routes for updating resources are the most complex.
     */

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    /**
     * Mongoose already ignores any update that does not have a correspondent
     * property in the Model. What we're doing here is to provide the user a
     * proper feedback about what is happening.
     */
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
    }

    try {
        /**
         * The findByIdAndUpdate method bypasses mongoose. It performs a direct
         * operation on the database. Is prevents the middleware from running
         * and that's not what we want.
         */

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const { user } = req;

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();


        res.send(user);
    } catch (error) {
        res.status(404).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user, req.name);
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer();

    req.user.avatar = buffer;

    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    // just clear the avatar field:
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        // setting up response header:
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;