const express = require('express');
const router = express.Router();
const { Users } = require('../models/userSignup.model');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        async function createUser() {
            const user = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
            await user.save();
        }
        await createUser().then(r => res.send('User signup successfully....')).catch(err => res.status(400).send(err.message));
    }
    else {
        const err = new Error('Password & Confirm Password does not match...');
        console.log(err.message);
        res.status(400).send(err.message);
    }
    res.end();
});


module.exports = router;