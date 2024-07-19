const express = require("express");
const {
  getProducts,
} = require("../../controllers/products/products.controller.js");
const router = express.Router();

router.get("/", getProducts);

module.exports = router;
