// src/routes/index.routes.js 

const { Router } = require("express");
const ProductManager = require("../ProductManager.js");
const router = Router();

const pm = new ProductManager();

// getRealtimeproducts
router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {}); 
});

// home static prods
router.get("/", async(req, res) => {
  const products = await pm.getProducts();
  res.status(200).render("home", { products }); 
});

module.exports = router;
