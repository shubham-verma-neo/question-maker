const { QuestionType } = require('../models/questionType.model');

module.exports = async function (req, res, next) {
    let questionType;
    if (req.body.questionType) {
        questionType = req.body.questionType;
    }
    else {
        questionType = req.query.questionType;
    }

    let questionTypeObj;
    try {
            questionTypeObj = await QuestionType.findById(questionType);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    let error;
    if (questionTypeObj.questionType === 'mcq') {
        req.body.questions.forEach(element => {
            if (element.answer.length < 2 || element.answer.length > 4) {
                error = new Error(`For ${questionTypeObj.questionType} questions, answer options should be '>= 2' and '<= 4'.`)
                return res.status(400).send(error.message);
            }
        });
    }
    else if (questionTypeObj.questionType === 'true/false') {
        req.body.questions.forEach(element => {
            if (element.answer.length != 2) {
                error = new Error(`For ${questionTypeObj.questionType} questions, answer options should be 2.`)
                return res.status(400).send(error.message);
            }
        });
    }
    else if (questionTypeObj.questionType === 'brief') {
        req.body.questions.forEach(element => {
            if (element.answer.length != 1) {
                error = new Error(`For ${questionTypeObj.questionType} questions, only 1 answer allowed.`)
                return res.status(400).send(error.message);
            }
        });
    }
    if (!error) {
        next();
    }
}