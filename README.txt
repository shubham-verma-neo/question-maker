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

get - http://localhost:8080/login     (returns auth-token for access other APIs)



req.query params

parameters             value

email                shubham.verma@neosoftmail.com
password             abcdef

res.header   // in returns you get a token for accessing the question paper related query 

header                 values //token for verification

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

==============================================================================================================================================================================================

subject master API

add new subjects to db

post - http://localhost:8080/subject/new   (create new subject to db)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

req.body format                                   subject schema
                                                                                    
{
  "subjectCode": "sc01",                        //{ type: String, trim: true, required: true, lowercase: true, unique: true }
  "subjectName": "science"                      //{ type: String, trim: true, required: true, lowercase: true, unique: true }
}

get all subject from db

get - http://localhost:8080/subject/all   (retrieve subjects from db)

==============================================================================================================================================================================================

questionType master API

add new questionType to db

post - http://localhost:8080/quectionType/new   (create new subject to db)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

req.body format                               questionType schema
                                                                                    
{

  "questionType": "mcq"                   // { type: String, trim: true, required: true, lowercase: true, unique: true }
}

get all questionType from db

get - http://localhost:8080/subject/all   (retrieve subjects from db)

==============================================================================================================================================================================================

question paper API

add new papers to db

post - http://localhost:8080/question/new   (create new paper to db)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

req.body format                                   question paper schema
                                                                                    
{
  "subject": "subjectMasterObjectId",                         //{   type: String,  trim: true, required: true, lowercase: true  }
  "questionType": "questionTypeMasterObjectId",               //{   type: String,  trim: true, required: true, lowercase: true}
  "questions": [                                                     
                    {
                        "question": "1Q1",                    //{   type: String,  required: true,  unique: true   }
                        "answer": [                           //{   type: [String], required: true  }
                            "1A1",
                            "1A2"
                        ],
                        "marks": "5"                          //{   type: String,  required: true   }
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

get - http://localhost:8080/question/papers   (returns question papers from db on the basis of query params)


req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

req.query params

case 1

parameters           value

subject            subjectMasterObjectId (if not mentioned returns all subject papers from db)
questionType       questionTypeMasterObjectId(if not mentioned returns all question type papers from db)

case 2

parameters           value

subject            subjectMasterObjectId (returns mentioned subject papers from db)
questionType       --  (if not mentioned returns all mentioned subject based question papers from db)

OR

questionType       questionTypeMasterObjectId (returns mentioned subject base mcq question type papers from db)

OR

questionType       questionTypeMasterObjectId (returns mentioned subject base true/false  question type papers from db)

OR

questionType       questionTypeMasterObjectId (returns mentioned subject base brief  question type papers from db)


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

get counts of papers

get - http://localhost:8080/question/counts   (returns question papers counts from db on the basis of query params)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk


req.query params

case 1

parameters           value

subject            subjectMasterObjectId (if not mentioned returns all subject papers count from db)
questionType       questionTypeMasterObjectId (if not mentioned returns all question type papers counts from db)

case 2

parameters           value

subject            subjectMasterObjectId (returns mentioned subject papers counts from db)
questionType       --  (if not mentioned returns all mentioned subject based question papers counts from db)

OR

questionType       questionTypeMasterObjectId (returns mentioned subject  base mcq question type papers counts from db)

OR

questionType       questionTypeMasterObjectId/false (returns mentioned subject base true/false  question type papers counts from db)

OR

questionType       questionTypeMasterObjectId (returns mentioned subject base brief  question type papers counts from db)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

add questions to paper

put- http://localhost:8080/question/add   (add provided question to the paper)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

req.query params

parameters           value

id                id of question paper from collection (id of question paper in which question need to add)
questionType      "questionTypeMasterObjectId"

req.body format

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

put - http://localhost:8080/question/remove   (remove provided question from the paper)

req.header            // required for access the page otherwise access denied 

header                 values 

auth-token          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjODM4NGVlZDI2NDExOTAyMjM0MjkiLCJpYXQiOjE2NjE3NzQ5NzN9.18RAINGEBrI3TsQJXInS8EJQH2ewUAa46nZCNKfeAzk

query params

parameters           value

id                 id of question paper from collection (id of question paper in which question need to remove)

req.body format

{                         //an array of question number that need to delete
  "questions": [7,2,5]    //provided question number must be less than or equal to of total questions in paper otherwise error
}

==============================================================================================================================================================================================

