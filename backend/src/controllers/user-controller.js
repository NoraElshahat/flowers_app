const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');
const bcrypt = require('bcryptjs');

//signup user
async function createUser(req, res, next) {
  const data = req.body;
  const user = new User(data);
  const validation = user.joiValidate(data);
  if (!validation.error) {
    const exist = await findByEmail(user.email);
    if (exist) {
      return res.status(400).send({
        message: 'alredy exist , please try to enter new email',
      });
    }
    if (req.file) {
      user.profilePicture = `http://localhost:5000/${req.file.path}`;
    }
    await user.save();
    res.status(200).send(validation.value);
  } else {
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
  const found = await User.find({ email });
  if (found.length != 0) {
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
