const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: Array },
  });

module.exports.productSchema = mongoose.model("Product", productSchema, "ecommerce");
