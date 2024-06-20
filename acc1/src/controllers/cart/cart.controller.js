const CartManager = require("../../managers/CartManager");
const cm = new CartManager();

const createCart = async (req, res) => {};
const getCart = async (req, res) => {
  res.send("cart: []");
};
const updateCart = async (req, res) => {};
const deleteProdFromCart = async (req, res) => {};
const addProdToCart = async (req, res) => {};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteProdFromCart,
  addProdToCart
};
