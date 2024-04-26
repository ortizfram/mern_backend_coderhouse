const express = require("express");
const ProductRoute = require("./routers/product.routes.js");
const CartRoute = require("./routers/cart.routes.js");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
mongoose
  .connect(
    "mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.use("/", express.static(__dirname + "/public"));

app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);

const port = 8080;
app.listen(port, () => {
  console.log(`listening ${port}`);
});
