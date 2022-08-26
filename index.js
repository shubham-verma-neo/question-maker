const mongoose = require('mongoose');
const express = require('express');
const app = express();
const signup = require('./routes/signup');
const login = require('./routes/login');
const home = require('./routes/home');
const question = require('./routes/question');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/question-maker')
    .then(() => console.log('connected to database...'))
    .catch(err => console.error('not connected to database...', err));

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/question', question);




const port = 8080;
app.listen(port, () => {
    console.log(`connected to port ${port}...`);
});