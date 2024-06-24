const { cartSchema } = require("../../dao/models/cart.models");
const { productSchema } = require("../../dao/models/product.model");
const CartManager = require("../../managers/CartManager");
const {ticketSchema} = require("../../dao/models/ticket.model")
const cm = new CartManager();

const createCart = async (req, res) => {
  try {
    const newCart = await cm.newCart();
    res
      .status(201)
      .json({ success: true, message: "cart created", id: newCart._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cm.getCartById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Assuming cart.products contains array of products
    res.status(200).json(cart); // Send the cart as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const deleteProdFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const products = await cm.unlistProdFromCart(cid, pid);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const addProdToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = cm.addProdToCart({ cid, pid });
    res.status(200).json({ cart: cid, products: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const purchaseCart = async (req, res) => {
  const cartId = req.params.cid;
  const userId = req.user.id;
  try {
    const { ticket, unprocessedProducts } = await cm.purchaseCart(cartId, userId);
    res.json({ success: true, ticket, unprocessedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCart,
  getCartById,
  deleteProdFromCart,
  addProdToCart,
  purchaseCart
};
