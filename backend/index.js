const express = require('express');
require('./src/db/db');
const { handleError } = require('./src/helpers/error');
const PORT = 5000;
const app = express();
const multer = require('multer');
const userRouter = require('./src/routers/user-router');
const bodyParser = require('body-parser');

// app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

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
  console.log(`your server is running on port ${PORT}`, __dirname);
});
