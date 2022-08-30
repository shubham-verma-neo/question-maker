const express = require('express');
const router = express.Router();
const { Questions } = require('../models/question.model');
const verify = require('../middleware/verifyToken');
const questionOptions = require('../middleware/questionOptions');

router.get('/papers', verify, async (req, res) => {
    let papers;
    if (req.query.subject && req.query.questionType) {
        papers = await Questions
            .find({ subject: req.query.subject, questionType: req.query.questionType });
        if (!papers) return;
        else return res.send(papers);
    }
    else if (req.query.subject) {
        papers = await Questions
            .find({ subject: req.query.subject });
        if (!papers) return;
        else return res.send(papers);
    }
    else if (req.query.questionType) {
        papers = await Questions
            .find({ questionType: req.query.questionType });
        if (!papers) return res.send(`No question paper with ${req.query.questionType} question type.`);
        else return res.send(papers);
    }

    papers = await Questions.find();
    res.send(papers);
});

router.get('/counts', verify, async (req, res) => {
    let counts;
    if (req.query.subject && req.query.questionType) {
        counts = await Questions
            .find({ subject: req.query.subject, questionType: req.query.questionType });
        if (!counts) return;
        else return res.send({ count: counts.length });
    }
    else if (req.query.subject) {
        counts = await Questions
            .find({ subject: req.query.subject });
        if (!counts) return;
        else return res.send({ count: counts.length });
    }
    else if (req.query.questionType) {
        counts = await Questions
            .find({ questionType: req.query.questionType });
        if (!counts) return;
        else return res.send({ count: counts.length });
    }
    counts = await Questions.find();
    res.send({ count: counts.length });
})

router.post('/new', verify, questionOptions, async (req, res) => {
    // router.post('/new', verify, async (req, res) => {
    async function saveQuestions() {
        let arr = [];
        await req.body.questions.forEach(element => {
            arr.push({
                question: element.question,
                answer: element.answer,
                marks: element.marks
            })
        });
        await new Questions({
            subject: req.body.subject,
            questionType: req.body.questionType,
            questions: arr
        }).save();
    }
    await saveQuestions()
        .then(result => res.send('Question paper created and saved successfully....'))
        .catch(err => res.status(400).send(err.message));
});

router.put('/add', verify, questionOptions, async (req, res) => {
    let question = await Questions
        .findById(
            req.query.id
        );
    if (!question) {
        let error = new Error('Question paper does not exist.')
        return res.send(error.message)
    }

    let arr = question.questions.concat(req.body.questions);
    // console.log(arr)

    try {
        await Questions
            .findOneAndUpdate({
                _id: req.query.id
            },
                {
                    questions: arr
                }
            );
        res.send('Question updated successfully...');
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error)
    }
})

router.put('/remove', verify, async (req, res) => {
    let question;

    question = await Questions
        .findById(
            req.query.id
        );
    if (!question) {
        let error = new Error('Question paper does not exist.')
        return res.send(error.message)
    }

    let arr = question.questions;

    let index = req.body.question.sort(function (a, b) { return a - b });
    // console.log(index);

    let indexLen = index.length;
    // console.log(indexLen);


    if (index[0] <= 0 || index[index.length - 1] > arr.length) {
        err = new Error(`Invalid question number, it should be more than or equal to 1 and less than or equal to ${arr.length}.`);
        return res.status(400).send(err.message);
    }


    while (indexLen) {
        // console.log(arr);
        arr.splice((index[0] - 1), 1);
        index.splice(0, 1);
        for (let i = 0; i < index.length; i++) {
            index[i] -= 1;
        }
        indexLen--
    }
    try {
        await Questions
            .findById(
                req.query.id
            )
            .update({
                questions: arr
            });
        res.send('Question removed successfully...');
    }
    catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
