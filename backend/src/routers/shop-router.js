const express = require('express');
const router = express.Router();
const {
  addNewShop,
  getShop,
  updateShop,
} = require('../controllers/shop-controller');

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

// post to add new shop
router.post('/new-shop', upload.single('banner'), addNewShop);

// get one shop details
router.get('/find-shop/:id', getShop);

// update shop
router.patch('/shop-details/:id', updateShop);
module.exports = router;
