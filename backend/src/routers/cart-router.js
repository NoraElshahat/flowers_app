const express = require('express');
const router = express.Router();

const { addToCart, getCartDetails } = require('../controllers/cart-controller');

router.post('/add-cart', addToCart);
router.get('/user/:id/cart-details', getCartDetails);

module.exports = router;
