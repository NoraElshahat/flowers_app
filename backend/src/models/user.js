const mongoose = require('mongoose');
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

const User = mongoose.model('User', UserSchema);
module.exports = User;
