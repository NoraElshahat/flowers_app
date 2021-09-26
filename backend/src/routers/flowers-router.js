const express = require('express');
const router = express.Router();

const {
  addFlower,
  flowers,
  getFlower,
  updateFlower,
} = require('../controllers/flowers-controller');
const multer = require('multer');

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

// router to add new flowers
router.post('/new-flower', upload.single('image'), addFlower);

// get all flowers
router.get('/flowers', flowers);

// get one flower
router.get('/flower/:id', getFlower);

// update one flower
router.patch('/update-flower/:id', updateFlower);

module.exports = router;
