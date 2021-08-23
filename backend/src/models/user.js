const mongoose = require('mongoose');
const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is Required'],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  creationDate: {
    type: String,
  },
});

const User = mongoose.model('User', User);
module.exports = User;
