const mongoose = require('mongoose');
const FavouriteAssignment = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  flowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flowers',
    },
  ],
});

const FavouriteAssignment = mongoose.model(
  'FavouriteAssignment',
  FavouriteAssignment
);
module.exports = FavouriteAssignment;
