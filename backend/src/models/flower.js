const mongoos = require('mongoose');

const Flowers = new mongoos.Schema({
  name: {
    type: String,
    required: [true, 'Shop Name is Required'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  sponsored: {
    type: Boolean,
  },
  shop: [
    {
      type: mongoos.Schema.Types.ObjectId,
      ref: 'FlowerShop',
    },
  ],
  creationDate: {
    type: Date,
  },
});

const Flowers = mongoos.model('Flowers', Flowers);
module.exports = Flowers;
