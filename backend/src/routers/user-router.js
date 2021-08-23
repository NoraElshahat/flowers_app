const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user-controller');

//signup
router.post('/signup', createUser);

module.exports = router;
