const express = require("express");
const ProductManager = require("./ProductManager");
const ejs = require('ejs');
const path = require("./Products.json");




const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))

const manager = new ProductManager();

// routes
app.get("/", (req, res) => {
  res.render('index');
});

app.get("/products", async (req, res) => {
  let products = [];
  let {limit} = req.query ? req.query : ''
  
  try {
    products = await manager.getProducts(limit);
  } catch (error) {
    console.error(error);
  }
  
  return res.status(200).json(products);
});
app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid
    let product = []
  try {
    product = await manager.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
  
});

app.listen(8080, () => {
  console.log("listening to http://localhost:8080");
});
