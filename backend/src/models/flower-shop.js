const mongoos = require('mongoose');

const FlowerShop = new mongoos.Schema({
  name: {
    type: String,
    required: [true, 'Shop Name is Required'],
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  flowersCount: {
    type: Number,
  },
  creationDate: {
    type: Date,
  },
});

const FlowerShop = mongoos.model('FlowerShop', FlowerShop);
module.exports = FlowerShop;
