const express = require("express");
const { getCart, deleteProdFromCart, updateCart, addProdToCart, createCart } = require("../../controllers/cart/cart.controller");
const {
  middlewareAuth,
  getCurrentUser,
} = require("../../controllers/auth/auth.controller");
const router = express.Router();

router.post("/", createCart);
router.get("/:cid", getCart);
router.put("/:cid/:pid", addProdToCart);
router.delete("/:cid/:pid", deleteProdFromCart);

module.exports = router;
