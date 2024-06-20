const express = require("express");
const {
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../../controllers/products/products.controller.js");
const { middlewareAuth, getCurrentUser } = require("../../controllers/auth/auth.controller.js");
const router = express.Router();

router.get("/" ,middlewareAuth, getCurrentUser, getProducts);
router.put("/:pid" ,middlewareAuth, getCurrentUser, updateProduct);
router.delete("/:pid" ,middlewareAuth, getCurrentUser, deleteProduct);

module.exports = router;
