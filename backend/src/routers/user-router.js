const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user-controller');

//signup
router.post('/signup', createUser);

//login
router.post('/login', loginUser);

module.exports = router;
