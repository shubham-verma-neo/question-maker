const express = require('express');
const router = express.Router();
const { Subjects } = require('../models/subject.model');
const verify = require('../middleware/verifyToken');

router.post('/new', verify, async (req, res) => {
    try {
        const subject = await new Subjects({
            subjectCode: req.body.subjectCode,
            subjectName: req.body.subjectName,
        }).save();
        res.send(await subject);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/all', async (req, res) => {
    try {
        let subject = await Subjects
            .find();
        res.send(subject);
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;