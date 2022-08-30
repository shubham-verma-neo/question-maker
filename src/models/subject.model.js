
var mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    subjectName: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    }
}, {
    timestamps: true,
});

const Subjects = mongoose.model('subject', subjectSchema);

module.exports = { Subjects }; 