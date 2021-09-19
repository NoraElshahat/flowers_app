const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user-controller');
const multer = require('multer');
const validateRequest = require('../models/user');
const validatorMiddlware = require('../middlewares/authmiddleware');
//multer to upload image to server
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//signup
router.post(
  '/signup',
  // validatorMiddlware(validateRequest),
  upload.single('profile-picture'),
  createUser
);

//login
router.post('/login', loginUser);

module.exports = router;
