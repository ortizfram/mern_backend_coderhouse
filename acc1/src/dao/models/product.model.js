const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
    // code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    //thumbnails: { type: Array },
    owner:{ type: mongoose.Schema.Types.ObjectId,ref:"User",default: "admin"},

  });

module.exports.productSchema = mongoose.model("Product", productSchema, "products");
