const express = require('express');
const router = express.Router();
const { QuestionType } = require('../models/questionType.model');
const verify = require('../middleware/verifyToken');

router.post('/new', verify, async (req, res) => {
    try {
        const questionType = await new QuestionType({
            questionType: req.body.questionType,
        }).save();
        res.send(questionType);
    }
    catch (err) {
        res.send(err.message);
    }
});

router.get('/all', async (req, res) => {
    try {
        let questionType = await QuestionType
            .find();
        res.send(questionType);
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;