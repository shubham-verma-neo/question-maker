
const express = require('express');
const router = express.Router();
const { Questions } = require('../model/question.model');

router.get('/papers', async (req, res) => {
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
        if (!papers) return;
        else return res.send(papers);
    }

    papers = await Questions.find();
    res.send(papers);
});

router.get('/counts', async (req, res) => {
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

router.post('/new', async (req, res) => {
    async function saveQuestions() {
        let arr = [];
        // console.log(req.body);
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
    await saveQuestions().then(r => res.send('Question paper created and saved successfully....')).catch(err => res.status(400).send(err.message));
});


router.put('/add', async (req, res) => {
    let question = await Questions
        .find({
            _id: req.query.id
        });
        
    // console.log(req.body);
    await req.body.questions.forEach(element => {
        question[0].questions.push({
            question: element.question,
            answer: element.answer,
            marks: element.marks
        });
    });

    let arr = question[0].questions;
    // console.log(arr);

    let questionUpdated = await Questions
        .find({
            _id: req.query.id
        })
        .update({ 
            questions: arr 
        });

    // console.log(questionUpdated);
    res.send('Question updated successfully...');
})

// router.put('/remove', async (req, res) => {
//     const question = await Questions
//         .find({
//             _id: req.query.id
//         });

//     if (req.query.question != 0 && req.query.question <= question[0].questions.length) {

//         let arr = question[0].questions;
//         arr.splice(req.query.question - 1, 1);
//         // console.log(arr);

//         let questionUpdated = await Questions
//             .find({
//                 _id: req.query.id
//             })
//             .update({
//                 questions: arr
//             });

//         // console.log(questionUpdated);
//         return res.send('Question removed successfully...');
//     }
//     const err = new Error('Please enter valid question number to remove..');
//     res.send(err.message);

// })


router.put('/remove', async (req, res) => {

    // retrieve question paper by id
    const question = await Questions
        .find({
            _id: req.query.id
        });
    let arr = question[0].questions;

    // taking questions number array to remove..
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
            index[i] = index[i] - 1;
        }
        indexLen--
    }

    let questionUpdated = await Questions
        .find({
            _id: req.query.id
        })
        .update({
            questions: arr
        });
    // console.log(await questionUpdated);
    res.send('Question removed successfully...');
});

module.exports = router;