const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const { _new, _all } = require('../controllers/subject.controller')

router.post('/new', verify, _new);

router.get('/all', _all);

module.exports = router;