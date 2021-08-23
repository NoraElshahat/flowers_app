const mongoose = require('mongoose');
const Cart = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  flowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flowers',
    },
  ],
  totalPrice: {
    type: Number,
  },
});

const Cart = mongoose.model('Cart', Cart);
module.exports = Cart;
