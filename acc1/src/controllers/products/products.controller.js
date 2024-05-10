const ProductManager = require("../../ProductManager.js");

const getProducts = async(req,res)=>{
    const user = req.session.user

    try {
        const products = await ProductManager.getProducts();
        res.render("products", { user: user, products: products }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProducts,

}