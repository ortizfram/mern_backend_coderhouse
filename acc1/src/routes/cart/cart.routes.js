const express = require("express");
const { getCartById, deleteProdFromCart, addProdToCart, createCart, purchaseCart } = require("../../controllers/cart/cart.controller");
const { middlewareAuth, getCurrentUser } = require("../../controllers/auth/auth.controller");

const router = express.Router();

router.post("/", createCart);
router.get("/:cid", getCartById);
router.put("/:cid/:pid", addProdToCart);
router.delete("/:cid/:pid", deleteProdFromCart);
router.post("/:cid/purchase", middlewareAuth, getCurrentUser,purchaseCart);

module.exports = router;
