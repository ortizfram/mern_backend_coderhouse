const express = require("express");
const {
  getProducts,
} = require("../../controllers/products/products.controller.js");
const { middlewareAuth, getCurrentUser } = require("../../controllers/auth/auth.controller.js");
const router = express.Router();

router.get("/" ,middlewareAuth, getCurrentUser, getProducts);

module.exports = router;
