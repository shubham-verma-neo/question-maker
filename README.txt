==============================================================================================================================================================================================
signup API

post - http://localhost:8080/signup    (create new user to db)

req.body format                                user signup schema

{
  "firstName": "Shubham",                       //{ type: String, trim: true, required: true }
  "lastName": "Verma",                          //{ type: String, trim: true, required: true }
  "email": "shubham.verma@neosoftmail.com",     //{ type: String, required: true, trim: true, lowercase: true, unique: true }
  "password": "abcdef",                         //String
  "confirmPassword": "abcdef"                   //String
}

==============================================================================================================================================================================================

login API

get - http://localhost:8080/login     (returns either success or rejected)

req.query params

parameters             value

email                shubham.verma@neosoftmail.com
password             abcdef

==============================================================================================================================================================================================

question paper API

add new papers to db

post - http://localhost:8080/new   (create new papers to db)

req.body format                                   question paper schema
                                                                                    
{
  "subject": "maths",                         //{   type: String,  trim: true, required: true, lowercase: true  }
"questionType": "mcq",                        //{   type: String,  trim: true, required: true, lowercase: true,  enum: {
                                                                                                                        values: ['mcq', 'true/false', 'brief'],
                                                                                                                        message: 'Question type should be "MCQ", "True/false", "Brief"..'
                                                                                                                    } }
  "questions": [                                                     
                    {
                        "question": "1Q1",      //{   type: String,  required: true,  unique: true   }
                        "answer": [             //{   type: [String], required: true  }
                            "1A1",
                            "1A2"
                        ],
                        "marks": "5"           //{   type: String,  required: true   }
                        } ,
                        {
                        "question": "1Q2",
                        "answer": [
                            "1A1",
                            "1A2"
                        ],
                        "marks": "5"
                        }  
                    ]
}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

get papers from db

get - http://localhost:8080/papers   (returns question papers from db on the basis of query params)

query params

case 1

parameters           value

subject            science, maths etc (if not mentioned returns all subject papers from db)
questionType       mcq, true/false, brief (if not mentioned returns all question type papers from db)

case 2

parameters           value

subject            science (returns mentioned subject papers from db)
questionType       --  (if not mentioned returns all science based question papers from db)
OR
questionType       mcq (returns mentioned subject  base mcq question type papers from db)
OR
questionType       true/false (returns mentioned subject base true/false  question type papers from db)
OR
questionType       brief (returns mentioned subject base brief  question type papers from db)


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

get counts of papers

get - http://localhost:8080/counts   (returns question papers counts from db on the basis of query params)

query params

case 1

parameters           value

subject            science, maths etc (if not mentioned returns all subject papers count from db)
questionType       mcq, true/false, brief (if not mentioned returns all question type papers counts from db)

case 2

parameters           value

subject            science (returns mentioned subject papers counts from db)
questionType       --  (if not mentioned returns all mentioned subject based question papers counts from db)
OR
questionType       mcq (returns mentioned subject  base mcq question type papers counts from db)
OR
questionType       true/false (returns mentioned subject base true/false  question type papers counts from db)
OR
questionType       brief (returns mentioned subject base brief  question type papers counts from db)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

add questions to paper

put- http://localhost:8080/add   (add provided question to the paper)

query params

parameters           value

id                id of question collection (id of question paper in which question need to add)

body format

{                                   //an array of object (question, answer, marks) 
  "questions": [
      {
      "question": "1Q5",
      "answer": [ "1A1", "1A2"],
      "marks": "5"
    },
      {
      "question": "1Q6",
      "answer": [ "1A1", "1A2"],
      "marks": "5"
    } 
  ]
}


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

remove questions from paper

put - http://localhost:8080/remove   (remove provided question from the paper)

query params

parameters           value

id                 id of question collection (id of question paper in which question need to remove)

body format

{                         //an array of question number that need to delete
  "questions": [7,2,5]    //provided question number must be less than or equal to of total questions in paper otherwise error
}

==============================================================================================================================================================================================

