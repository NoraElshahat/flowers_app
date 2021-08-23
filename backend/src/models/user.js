const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ErrorHandler } = require('../helpers/error');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
  },
  image: {
    type: String,
  },
  creationDate: {
    type: String,
  },
});

UserSchema.statics.findByMailAndPassword = async (email, password) => {
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

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
