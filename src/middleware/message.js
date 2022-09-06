const dbConnected = 'Connected to MongoDB...';
const dbNotConnected = 'Not connected to MongoDB...';
const welcome = 'Welcome to the question-maker...';
const signupSuccess = 'User signup successfully....';
const passwordNotMatch = 'Password and confirm password does not match....';
const invalidEmailPassword = 'Invalid email or password. Please try again...';
const questionTypeSuccess = 'Question type added to master successfully.';
const subjectAddedSuccess = 'Subject added to master successfully.';
const subjectQuestionTypeRejected = 'No question paper on the basis of this selection.'
const subjectRejected = 'No question paper with selected subject.';
const questionTypeRejected = '`No question paper with selected question type.`';
const questionPaperSuccess = 'Question paper created and saved successfully....';
const questionPaperNotExists = 'Question paper does not exist.';
const questionPaperExists = 'Comment added successfully';
const questionNotExists = `Invalid question number, it should be more than or equal to 1 and less than or equal to max question in paper.`;
const questionRemoved = 'Question removed successfully...';



module.exports = {
    dbConnected,
    dbNotConnected,
    welcome,
    signupSuccess,
    passwordNotMatch,
    invalidEmailPassword,
    questionTypeSuccess,
    subjectAddedSuccess,
    subjectQuestionTypeRejected,
    subjectRejected,
    questionTypeRejected,
    questionPaperSuccess,
    questionPaperNotExists,
    questionPaperExists,
    questionNotExists,
    questionRemoved
};