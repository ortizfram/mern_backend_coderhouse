const ProductManager = require("../../ProductManager.js");
const pm = new ProductManager();

const getProducts = async (req, res) => {
  const user = req.user;

  try {
    const products = await pm.getProducts();
    res.render("products", { user: user, products: products, admin: user && user.role === "admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
};
