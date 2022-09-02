const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/signup.login.controller');

router.get('/', login);

module.exports = router;