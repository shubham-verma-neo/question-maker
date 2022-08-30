const express = require('express');
const router = express.Router();
const { Users } = require('../models/userSignup.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const user = await Users.findOne({ email: req.query.email });

    if (!user) {
        return res.status(401).send('Invalid username or password.');
    }

    if (! await bcrypt.compare(req.query.password, user.password)) {
        return res.status(401).send('Invalid username or password.');
    }

    const token = jwt.sign({ _id: user._id }, 'klgjs');
    res.header('auth-token', token).send(token);
});


module.exports = router;