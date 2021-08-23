const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/flowers_app', {
  useNewUrlParser: true,
});
