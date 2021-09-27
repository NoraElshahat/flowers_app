const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: { createdAt: 'addedAt' } }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
