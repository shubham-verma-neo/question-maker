
var mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    questionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionType',
        required: true
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