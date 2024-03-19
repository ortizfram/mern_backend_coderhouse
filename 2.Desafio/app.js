const express = require("express");
const path = require("./Products.json");
const ProductManager = require("./ProductManager");

const app = express();
app.use(express.urlencoded({extended:true}))

const manager = new ProductManager();

// routes
app.get("/", (req, res) => {
  res.send("<button><a href='/products?limit=2&page=1'>Get products</a></button>");
});

app.get("/products", async (req, res) => {
  let products = [];
  let {limit} = req.query ? req.query : 2
  try {
    products = await manager.getProducts(limit);
  } catch (error) {
    console.error(error);
  }
  return res.status(200).json(products);
});

app.listen(8080, () => {
  console.log("listening to http://localhost:8080");
});
