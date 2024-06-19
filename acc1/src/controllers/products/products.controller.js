const ProductManager = require("../../managers/ProductManager.js");
const pm = new ProductManager();

const getProducts = async (req, res) => {
    const user = req.user;
  
    try {
      const products = await pm.getProducts();
      const firstName = user ? user.first_name : null;  // Extract first_name or set to null if user is not available
      const isAdmin = user && user.role === "admin";  // Determine if the user is an admin
      console.log("admin",isAdmin)
      res.render("products", { firstName: firstName,products: products, isAdmin: isAdmin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

module.exports = {
  getProducts,
};
