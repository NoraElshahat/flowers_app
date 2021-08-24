const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');
const bcrypt = require('bcryptjs');

//signup user
async function createUser(req, res, next) {
  try {
    const { body } = req;
    if (body.email == '' || !('email' in body)) {
      throw new ErrorHandler(400, 'Email is Required');
    }
    if (body.password == '' || !('password' in body)) {
      throw new ErrorHandler(400, 'Password is Required');
    }
    const exist = await findByEmail(body.email);
    if (exist) {
      throw new ErrorHandler(400, 'already exist');
    }
    const newUser = await new User(body);
    if (req.file) {
      newUser.profilePicture = `http://localhost:5000/${req.file.path}`;
    }
    await newUser.save();

    return res
      .status(200)
      .send({ message: 'user created successfully', data: newUser });
  } catch (error) {
    next(error);
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
  const found = await User.findOne({ email });
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
