const { QuestionType } = require('../models/questionType.model');
const { questionTypeSuccess } = require('../middleware/message');
//------------------------------------------------------------------------------------------------------------------//

const _new = async (req, res) => {
    try {
        const questionType = await new QuestionType({
            questionType: req.body.questionType,
        }).save();
        res.send({ message: questionTypeSuccess, questionType: questionType });
    }
    catch (err) {
        res.send(err.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

const _all = async (req, res) => {
    try {
        let questionType = await QuestionType
            .find();
        res.send(questionType);
    }
    catch (err) {
        res.send(err.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { _new, _all };