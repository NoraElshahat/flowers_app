const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const UserSchema = require('../models/user');
//signup user
async function createUser(req, res, next) {
  const data = req.body;
  const validation = UserSchema.validate(data);
  if (!validation.error) {
    res.status(200).send(validation.value);
  } else {
    // const exist = await findByEmail(data.email);
    // if (exist) {
    //   throw new ErrorHandler(400, 'already exist');
    // }
    // const newUser = await new User(data);
    // if (req.file) {
    //   newUser.profilePicture = `http://localhost:5000/${req.file.path}`;
    // }
    // await newUser.save();
    res.status(400).send(validation.error.details[0].message);
  }
}

async function loginUser(req, res, next) {
  try {
    const { body } = req;
    const userFound = await findByMailAndPassword(body.email, body.password);

    return res
      .status(200)
      .send({ message: 'user logined successfully', data: userFound });
  } catch (error) {
    next(error);
  }
}

async function findByEmail(email) {
  console.log(email);
  const found = await User.find({ email });
  if (found) {
    return true;
  }
  return false;
}

findByMailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new ErrorHandler(400, 'Email Or Password required');
  }
  const user = await User.findOne({ email });
  if (user === null) {
    throw new ErrorHandler(400, 'User Not Exist');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorHandler(400, 'Password not matched');
  }
  return user;
};

module.exports = {
  createUser,
  loginUser,
};
