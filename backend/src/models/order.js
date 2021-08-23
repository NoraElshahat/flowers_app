const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  },
  flowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flowers',
      required: [true],
    },
  ],
  totalPrice: {
    type: Number,
  },
  creationDate: {
    type: String,
  },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
