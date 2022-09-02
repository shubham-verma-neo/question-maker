const { Subjects } = require('../models/subject.model');

//------------------------------------------------------------------------------------------------------------------//

const _new = async (req, res) => {
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
}

//------------------------------------------------------------------------------------------------------------------//

const _all = async (req, res) => {
    try {
        let subject = await Subjects
            .find();
        res.send(subject);
    }
    catch (err) {
        res.send(err.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { _new, _all };