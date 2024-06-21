const express = require("express");
const { getCartById, deleteProdFromCart, updateCart, addProdToCart, createCart } = require("../../controllers/cart/cart.controller");
const router = express.Router();

router.post("/", createCart);
router.get("/:cid", getCartById);
router.put("/:cid/:pid", addProdToCart);
router.delete("/:cid/:pid", deleteProdFromCart);
router.post("/:cid/purchase", console.log("purchase"));

module.exports = router;
