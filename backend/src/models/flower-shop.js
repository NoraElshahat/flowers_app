const mongoos = require('mongoose');
const Joi = require('joi');
const FlowerShopSchema = new mongoos.Schema(
  {
    name: {
      type: String,
    },
    banner: {
      type: String,
    },
    location: {
      type: String,
    },
    flowersCount: {
      type: Number,
    },
  },
  { timestamps: { createdAt: 'addedAt' } }
);

// validation schema
FlowerShopSchema.methods.joiValidate = (shopData) => {
  const validateSchema = Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    flowersCount: Joi.number().integer(),
    banner: Joi.string(),
  });

  return validateSchema.validate(shopData);
};

const FlowerShop = mongoos.model('FlowerShop', FlowerShopSchema);
module.exports = FlowerShop;
