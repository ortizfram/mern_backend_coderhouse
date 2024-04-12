// src/routes/home.routes.js

const express = require("express");
const router = express.Router();
const ProductManager = require("../ProductManager.js");
const { io } = require("../app.js");
const uploader = require("../utils/multer.js");

// Crear una instancia de ProductManager
const productManager = new ProductManager(io);

router.get("/", async (req, res) => {
  try {
    // Obtener los productos utilizando el ProductManager
    const products = await productManager.getProducts();
    res.render("home", { products: products }); // Pasar los productos a la plantilla
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
});

// getRealtimeproducts
router.get("/realtimeproducts", async (req, res) => {
  try {
    // Get products from the ProductManager
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products: products }); // Pass products to the realTimeProducts view
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// addProduct


module.exports = router;
