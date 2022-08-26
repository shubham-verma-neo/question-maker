
var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: String
}, {
    timestamps: true,
});

const Users = mongoose.model('Users', userSchema);



module.exports = { Users }; 