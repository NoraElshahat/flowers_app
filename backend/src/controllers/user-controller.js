const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');

//signup user
async function createUser(req, res, next) {
  try {
    const { body } = req;
    if (body.email == '' || !('email' in body)) {
      throw new ErrorHandler(404, 'Email is Required');
    }
    if (body.password == '' || !('password' in body)) {
      throw new ErrorHandler(400, 'Password is Required');
    }
    const newUser = await new User(body);
    if (req.file) {
      newUser.profilePicture = req.file.filename;
    }
    await newUser.save(function (error) {
      if (error) {
        if (error.code === 11000 && error.name === 'MongoError') {
          return res
            .status(422)
            .send({ message: 'This user is already exist' });
        }
      }
      return res
        .status(200)
        .send({ message: 'user created successfully', data: newUser });
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { body } = req;
    const userFound = await User.findByMailAndPassword(
      body.email,
      body.password
    );

    return res
      .status(200)
      .send({ message: 'user logined successfully', data: userFound });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  loginUser,
};
