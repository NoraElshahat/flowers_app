const express = require('express');
require('./src/db/db');
const { handleError } = require('./src/helpers/error');
const PORT = 5000;
const app = express();
const userRouter = require('./src/routers/user-router');
const shopRouter = require('./src/routers/shop-router');
const flowersRouter = require('./src/routers/flowers-router');
const cartRouter = require('./src/routers/cart-router');
const bodyParser = require('body-parser');

app.use('/uploads', express.static('uploads'));

//to convert body of request to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/shop', shopRouter);
app.use('/flower', flowersRouter);
app.use('/cart', cartRouter);

// central handle error
app.use((err, req, res, next) => {
  handleError(err, res);
});

//server listenning
app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
