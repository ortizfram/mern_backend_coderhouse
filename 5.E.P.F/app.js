const express = require("express");
const ProductRoute = require("./routers/product.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use("/api", ProductRoute);
// app.use("/api/carts", cartRoute);

const port = 8080;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
