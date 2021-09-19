const FlowerShop = require('../models/flower-shop');
const Redis = require('redis');
const redisClient = Redis.createClient();

// add new shop
const addNewShop = async (req, res) => {
  const data = req.body;
  const shop = new FlowerShop(data);
  const validation = shop.joiValidate(data);
  if (!validation.error) {
    if (req.file) {
      shop.banner = `http://localhost:5000/${req.file.path}`;
    }
    await shop.save();
    redisClient.set('new-shop', JSON.stringify(shop));
    return res.status(200).send({ data: shop });
  } else {
    res.status(400).send(validation.error.details[0].message);
  }
};

// get one shop details
const getShop = async (req, res) => {
  const id = req.params.id;
  const shopFound = await FlowerShop.find({ _id: id });
  console.log(shopFound, 'found');
  if (shopFound.length == 0) {
    return res.status(400).send({ message: 'Shop Not Found' });
  } else {
    redisClient.set('shop', JSON.stringify(shopFound));
    return res.status(200).send({ data: shopFound });
  }
};

// update shop
const updateShop = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const findShop = await FlowerShop.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (findShop) {
    return res.status(200).send({ data: findShop });
  } else {
    return res.status(400).send({ message: 'Something Went Wrong' });
  }
};

module.exports = { addNewShop, getShop, updateShop };
