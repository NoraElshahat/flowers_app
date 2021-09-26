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

// get data of shop paginated
const getShopWithLimits = async (req, res) => {
  const pageOptions = {
    pageNumber: parseInt(req.params.num),
    limit: parseInt(req.params.lim),
  };
  const fetchedShop = await FlowerShop.find()
    .skip(pageOptions.limit * pageOptions.pageNumber)
    .limit(pageOptions.limit);
  redisClient.set('paginated_shop', JSON.stringify(fetchedShop));
  if (fetchedShop.length != 0) {
    return res.status(200).send({ data: fetchedShop });
  } else {
    return res.status(400).send({ message: 'No Data Available' });
  }
};

// find nearest location of shop
const nearestShop = async (req, res) => {
  const { lon1, lat1, lon2, lat2 } = req.params;
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;

    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;

    dist = dist * 60 * 1.1515;

    // distance with kilometers
    dist = dist * 1.609344;

    return res.status(200).send({ distance: dist });
  }
};
module.exports = {
  addNewShop,
  getShop,
  updateShop,
  getShopWithLimits,
  nearestShop,
};
