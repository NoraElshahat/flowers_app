const mongoose = require('mongoose');
const FavouriteAssignmentSchema = new mongoose.Schema({
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
  FavouriteAssignmentSchema
);
module.exports = FavouriteAssignment;
