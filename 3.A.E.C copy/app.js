const express = require("express");
const petsRoute = require("./routers/pets.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"))

app.use("/api", petsRoute);

const port = 3131;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
