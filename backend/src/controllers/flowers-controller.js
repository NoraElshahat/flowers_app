const Flowers = require('../models/flower');
const Redis = require('redis');
const redisClient = Redis.createClient();

// add new flowers
const addFlower = async (req, res) => {
  const newFlowerAdded = await new Flowers(req.body);
  if (req.file) {
    newFlowerAdded.image = `http://localhost:5000/${req.file.path}`;
  }
  await newFlowerAdded.save();

  if (newFlowerAdded) {
    redisClient.set('new-flower', JSON.stringify(newFlowerAdded));
    return res.status(200).send({ data: newFlowerAdded });
  } else {
    return res.status(400).send({ data: 'Something went wrong' });
  }
};

// get all flowers under all shops and filter by sponsered
const flowers = async (req, res) => {
  console.log(req.query);
  if (req.query.sponser) {
    const allFlowers = await Flowers.find({ sponsored: req.query.sponser });
    if (allFlowers.length != 0) {
      redisClient.set('all-flowers-sponsered', JSON.stringify(allFlowers));
      return res.status(200).send({ sponseredFlowers: allFlowers });
    } else {
      return res.status(200).send({ sponseredFlowers: 'No Data Available' });
    }
  }
  const allFlowers = await Flowers.find();
  if (allFlowers) {
    redisClient.set('all-flowers', JSON.stringify(allFlowers));
    return res.status(200).send({ flowers: allFlowers });
  } else {
    return res.status(400).send({ flowers: 'No Data available' });
  }
};

// get one flower
const getFlower = async (req, res) => {
  const id = req.params.id;
  const flowerFound = await Flowers.find({ _id: id });
  if (flowerFound.length == 0) {
    return res.status(400).send({ message: 'Flower Not Found' });
  } else {
    redisClient.set('flower', JSON.stringify(flowerFound));
    return res.status(200).send({ data: flowerFound });
  }
};

// update flower
const updateFlower = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const findFlower = await Flowers.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (findFlower) {
    return res.status(200).send({ data: findFlower });
  } else {
    return res.status(400).send({ message: 'Something Went Wrong' });
  }
};

module.exports = {
  addFlower,
  flowers,
  getFlower,
  updateFlower,
};
