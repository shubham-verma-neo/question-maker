
var mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    questionType: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: {
            values: ['mcq', 'true/false', 'brief'],
            message: 'Question type should be "MCQ", "True/false", "Brief"..'
        }
    },
    questions: [{
        question: {
            type: String,
            required: true,
            unique: true
        },
        answer: {
            type: [String],
            required: true
        },
        marks: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true,
});

const Questions = mongoose.model('question', questionSchema);



module.exports = { Questions }; 