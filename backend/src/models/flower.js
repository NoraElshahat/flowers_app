const mongoos = require('mongoose');

const FlowersSchema = new mongoos.Schema(
  {
    name: {
      type: String,
      required: [true, 'Flower Name is Required'],
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
  },
  { timestamps: { createdAt: 'addedAt' } }
);

const Flowers = mongoos.model('Flowers', FlowersSchema);
module.exports = Flowers;
