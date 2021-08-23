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
        .json({ message: 'user created successfully', data: newUser });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
};
