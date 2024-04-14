// src/routes/index.routes.js 

const { Router } = require("express");
const ProductManager = require("../ProductManager.js");
const router = Router();

const pm = new ProductManager();

// getRealtimeproducts
router.get("/realtimeproducts", async (req, res) => {
  try {
    // Get products from the ProductManager
    const products = await pm.getProducts();
    req.app.io.emit("productUpdate", { products });
    res.status(200).render("realTimeProducts", { products }); 
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// home static prods
router.get("/", async(req, res) => {
  const products = await pm.getProducts();
  res.status(200).render("home", { products }); 
});

module.exports = router;
