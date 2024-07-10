const express = require("express");
const {loggerMiddleware} = require("./logger");
require('dotenv').config();


const app = express();
app.use(loggerMiddleware);
app.use("/", (req, res) => {
  res.send({ message: "Prueba de logger!" });
  req.logger.warn("warn !");
  req.logger.verbose("verbose !");
});

app.listen(8080, () => {
  console.log("Listening !");
});
