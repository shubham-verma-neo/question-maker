const signup = require('../routes/signup');
const login = require('../routes/login');
const home = require('../routes/home');
const question = require('../routes/question');
const subject = require('../routes/subject');
const questionType = require('../routes/questionType');

module.exports= function(app, express){
app.use(express.json());
app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/question', question);
app.use('/subject', subject);
app.use('/questionType', questionType);
}