const { Router } = require("express");
const { uploader } = require("../utils/multer");
const CartManager = require("../dao/managers/CartManager.js");

const cartManager = new CartManager();
const router = Router();

// crear carrito
router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.newCart();
    return res
      .status(201)
      .json({ success: true, message: "newCart", nuevoCarrito });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creado carrito", error: error.message });
  }
});

// listar productos del carrito
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const carrito = await cartManager.listProdsInCart(cid);
    if (carrito) {
      return res
        .status(200)
        .json({ success: "listCart", carrito });
    } else {
      return res.status(404).json({ message: "Cart not found", carrito: [] });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Agregar Prod. a carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const agregado = await cartManager.addProdToCart(
      req.params.cid,
      req.params.pid
    );
    return res
      .status(201)
      .json({ success: true, message: "addedToCart", agregado });
  } catch (error) {
    return res.status(500).json({
      message: "Error agregando Prod a Carrito",
      error: error.message,
    });
  }
});

module.exports = router;
