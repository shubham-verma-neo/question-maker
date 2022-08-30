
var mongoose = require("mongoose");

const questionTypeSchema = new mongoose.Schema({
    questionType: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    }
}, {
    timestamps: true,
});

const QuestionType = mongoose.model('questionType', questionTypeSchema);

module.exports = { QuestionType }; 