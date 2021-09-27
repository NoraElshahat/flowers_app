const Cart = require('../models/cart');
const Redis = require('redis');
const redisClient = Redis.createClient();

// add to cart
const addToCart = async (req, res) => {
  const newToCart = await new Cart(req.body);
  if (newToCart) {
    redisClient.set('user-cart', JSON.stringify(newToCart));
    await newToCart.save();
    return res.status(200).send({ addedToCart: newToCart });
  } else {
    return res.status(400).send({ message: 'Something Went Wrong' });
  }
};

// get details to cart
const getCartDetails = async (req, res) => {
  const id = req.params.id;
  var price = 0;
  const findDetails = await Cart.find(
    { user: id },
    { user: 0, _id: 0 }
  ).populate('flowers');
  if (findDetails.length != 0) {
    findDetails.map((item) => {
      price += item.flowers[0].price;
    });
    redisClient.set('user-cart-details', JSON.stringify(findDetails));
    return res.status(200).send({ details: findDetails, totalPrice: price });
  } else {
    return res.status(400).send({ message: 'no flowers to this user' });
  }
};
module.exports = { addToCart, getCartDetails };
