const express = require('express');
require('./src/db/db');
const { handleError, ErrorHandler } = require('./src/helpers/error');
const PORT = 5000;
const app = express();
const userRouter = require('./src/routers/user-router');
const bodyParser = require('body-parser');

//to convert body of request to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);

// central handle error
app.use((err, req, res, next) => {
  handleError(err, res);
});

//server listenning
app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
