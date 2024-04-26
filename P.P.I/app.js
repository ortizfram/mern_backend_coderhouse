const express = require("express");
const ProductRoute = require("./routers/product.routes.js");
const CartRoute = require("./routers/cart.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);

const port = 8080;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
