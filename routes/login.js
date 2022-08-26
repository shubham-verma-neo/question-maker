const express = require('express');
const router = express.Router();
const { Users } = require('../model/userSignup.model');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const user = await Users.findOne({ email: req.query.email });
    if (user) {
        if (await bcrypt.compare(req.query.password, user.password)) {
            // console.log('You are successfully logged in...');
            return res.send('You are successfully logged in...');
        }
    }
    const err = new Error('Invalid username or password.');
    // console.log(err);
    res.status(400).send(err.message);
});


module.exports = router;