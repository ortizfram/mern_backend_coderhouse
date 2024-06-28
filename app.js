// app.js
const express = require('express');
const router = require('./routes');
router

const app = express();
const PORT = 3000;

app.use('/users', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
