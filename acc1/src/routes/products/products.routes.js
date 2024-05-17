const express = require("express");
const {
  getProducts,
} = require("../../controllers/products/products.controller.js");
const { middlewareAuth } = require("../../controllers/auth/auth.controller.js");
const router = express.Router();

router.get("/", middlewareAuth, getProducts);

module.exports = router;
