const ProductManager = require("../../managers/ProductManager.js");
const pm = new ProductManager();

const getProducts = async (req, res) => {
    const user = req.user;
  
    try {
      const products = await pm.getProducts();
      const isAdmin = user && user.role === "admin";  // Determine if the user is an admin
      console.log("admin",isAdmin)
      res.render("products", { firstName: user?.first_name ||null,products: products, isAdmin: isAdmin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

module.exports = {
  getProducts,
};
