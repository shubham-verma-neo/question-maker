const { Questions } = require('../models/question.model');
const {
    subjectQuestionTypeRejected,
    subjectRejected,
    questionTypeRejected,
    questionPaperSuccess,
    questionPaperNotExists,
    questionPaperExists,
    questionNotExists,
    questionRemoved } = require('../middleware/message');
//------------------------------------------------------------------------------------------------------------------//

const _papers = async (req, res) => {
    let papers;
    if (req.query.subject && req.query.questionType) {
        papers = await Questions
            .find({ subject: req.query.subject, questionType: req.query.questionType })
            .populate('subject questionType questions', 'subjectName questionType -_id');
        if (!papers) return res.send(subjectQuestionTypeRejected);
        else return res.send(papers);
    }
    else if (req.query.subject) {
        papers = await Questions
            .find({ subject: req.query.subject })
            .populate('subject questionType questions', 'subjectName questionType -_id');
        if (!papers) return res.send(subjectRejected);
        else return res.send(papers);
    }
    else if (req.query.questionType) {
        papers = await Questions
            .find({ questionType: req.query.questionType })
            .populate('subject questionType questions', 'subjectName questionType -_id');
        if (!papers) return res.send(questionTypeRejected);
        else return res.send(papers);
    }

    papers = await Questions
        .find()
        .populate('subject questionType questions', 'subjectName questionType -_id');
    res.send(papers);
}

//------------------------------------------------------------------------------------------------------------------//

const _counts = async (req, res) => {
    let counts;
    if (req.query.subject && req.query.questionType) {
        counts = await Questions
            .find({ subject: req.query.subject, questionType: req.query.questionType });
        if (!counts) return res.send(subjectQuestionTypeRejected);
        else return res.send({ count: counts.length });
    }
    else if (req.query.subject) {
        counts = await Questions
            .find({ subject: req.query.subject });
        if (!counts) return res.send(subjectRejected);
        else return res.send({ count: counts.length });
    }
    else if (req.query.questionType) {
        counts = await Questions
            .find({ questionType: req.query.questionType });
        if (!counts) return res.send(questionTypeRejected);
        else return res.send({ count: counts.length });
    }
    counts = await Questions.find();
    res.send({ count: counts.length });
}

//------------------------------------------------------------------------------------------------------------------//

const _new = async (req, res) => {
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
        .then(result => res.send(questionPaperSuccess))
        .catch(err => res.status(400).send(err.message));
}

//------------------------------------------------------------------------------------------------------------------//

const _add = async (req, res) => {
    let question = await Questions
        .findById(
            req.query.id
        );
    if (!question) {
        let error = new Error(questionPaperNotExists)
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
        res.send(questionPaperExists);
    } catch (error) {
        res.status(400).send(error.message);
        // console.log(error)
    }
}

//------------------------------------------------------------------------------------------------------------------//

const _remove = async (req, res) => {
    let question;
    try {
        question = await Questions
            .findById(
                req.query.id
            );
    } catch (error) {
        return res.send(error.message)
    }
    if (!question) {
        let error = new Error(questionPaperNotExists)
        return res.send(error.message)
    }

    let arr = question.questions;

    let index = req.body.questions.sort(function (a, b) { return a - b });
    // console.log(index);

    let indexLen = index.length;
    // console.log(indexLen);


    if (index[0] <= 0 || index[index.length - 1] > arr.length) {
        err = new Error(questionNotExists);
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
        res.send(questionRemoved);
    }
    catch (error) {
        res.send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { _papers, _counts, _new, _add, _remove };