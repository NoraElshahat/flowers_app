const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const UserSchema = new mongoose.Schema(
  {
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
    profilePicture: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'addedAt' } }
);

UserSchema.methods.joiValidate = (user) => {
  const validationSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profilePicture: Joi.string(),
  });
  return validationSchema.validate(user);
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
