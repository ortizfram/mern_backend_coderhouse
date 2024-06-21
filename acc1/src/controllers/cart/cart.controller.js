const CartManager = require("../../managers/CartManager");
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
    const cid = req.params;
    const cart = cm.listProdsInCart(cid);
    res.render("cart", { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const deleteProdFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = cm.unlistProdFromCart({ cid, pid });
    res.status(204);
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

module.exports = {
  createCart,
  getCartById,
  deleteProdFromCart,
  addProdToCart,
};
