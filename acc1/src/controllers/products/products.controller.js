const ProductManager = require("../../managers/ProductManager.js");
const pm = new ProductManager();

const addProduct = async (req, res) => {
  const { title, description, price, stock, category, status } = req.body;
  try {
    const addedProduct = await pm.addProduct({
      title,
      description,
      price,
      stock,
      category,
      status,
    });
    res.json(addedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProducts = async (req, res) => {
  const user = req.user;

  try {
    const products = await pm.getProducts();
    const isAdmin = user && user.role === "admin"; 
    const isPremium = user && user.role === "premium"; 
    console.log("admin", isAdmin);
    res.render("products", {
      firstName: user?.first_name || null,
      products: products,
      isAdmin: isAdmin,
      isPremium:isPremium,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const { title, description, price, stock, category, status } = req.body;

  try {
    const updatedProduct = await pm.updateProduct(pid, {
      title,
      description,
      price,
      stock,
      category,
      status,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const foundProduct = await pm.getProductById(pid);
    res.json(foundProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    await pm.deleteProduct(pid);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
