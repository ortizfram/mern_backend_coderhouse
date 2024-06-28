// app.js
const express = require('express');
const mockRouter = require('./routes');
const errorMiddleware=require("./middlewares/errorMiddleware")

const app = express();
const PORT = 3000;

app.use('/', mockRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
