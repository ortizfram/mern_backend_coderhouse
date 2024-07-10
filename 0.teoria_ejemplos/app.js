const express = require("express");
const addLogger = require("./logger");

const app = express();
app.use(addLogger);
app.use("/", (req, res) => {
  res.send({ message: "Prueba de logger!" });
  req.logger.warn("Alerta !")
});

app.listen(8080, () => {
  console.log("Listening !");
});
