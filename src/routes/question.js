const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const questionOptions = require('../middleware/questionOptions');
const { _papers, _counts, _new, _add, _remove } = require('../controllers/question.controller');

router.get('/papers',  verify, _papers);

router.get('/counts', verify, _counts)

router.post('/new', verify, questionOptions, _new);

router.put('/add', verify, questionOptions, _add)

router.put('/remove', verify, _remove);

module.exports = router;
