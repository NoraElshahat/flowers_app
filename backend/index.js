const express = require('express');
require('./src/db/db');
const { handleError, ErrorHandler } = require('./src/helpers/error');
const PORT = 5000;
const app = express();

app.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'hiiiii found');
});
// central handle error
app.use((err, req, res, next) => {
  handleError(err, res);
});

//server listenning
app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
