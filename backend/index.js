const express = require('express');
require('./src/db/db');
const PORT = 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
