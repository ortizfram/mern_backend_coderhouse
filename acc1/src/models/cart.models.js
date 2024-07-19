const mongoose =require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }]
  });

module.exports.cartSchema = mongoose.model("Cart", cartSchema, "carts");
