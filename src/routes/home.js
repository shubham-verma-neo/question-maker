const express = require('express');
const router = express.Router();
const { welcome } = require('../middleware/message');

router.get('/', (req, res) => {
    res.send(welcome);
});

module.exports = router;