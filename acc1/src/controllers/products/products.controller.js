const ProductManager = require("../../ProductManager.js");
const pm = new ProductManager()

const getProducts = async(req,res)=>{
    // const user = req.session.user
    // const admin = req.session.admin
    // con passport
    const user = req.user
    const admin = req.user.role === 'admin'

    try {
        const products = await pm.getProducts();
        res.render("products", { user: user, products: products, admin:admin }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProducts,

}