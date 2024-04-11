const express = require("express");
const router = express.Router();
const ProductManager = require("../ProductManager.js");

// Crear una instancia de ProductManager
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    // Obtener los productos utilizando el ProductManager
    const products = await productManager.getProducts();
    res.render("home", { products: products }); // Pasar los productos a la plantilla
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

module.exports = router;
