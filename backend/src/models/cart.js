const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
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

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
