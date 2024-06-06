const fs = require("fs");
const ProductManager = require("./ProductManager.js");
const mongoose = require("mongoose");
const { cartSchema: Cart } = require("../dao/models/cart.models.js");
const { productSchema: Product } = require("../dao/models/product.model.js");

class CartManager {
  constructor() {
    this.carritos = [];
    this.path = "./carrito.json";
    this.productManager = new ProductManager();
    this.getData();
  }

  getData = async () => {
    const data = await Cart.find({});
    return data;
  };

  async newCart() {
    try {
      const nuevoCarrito = await Cart.create({ products: [] });
      return nuevoCarrito;
    } catch (error) {
      throw new Error("Error creating new cart: " + error.message);
    }
  }

  async listProdsInCart(cid) {
    try {
      const carrito = await Cart.findById(new mongoose.Types.ObjectId(cid));
      return carrito ? carrito : null;
    } catch (error) {
      throw new Error("Error fetching cart: " + error.message);
    }
  }

  async addProdToCart(cid, pid) {
    try {
      const product = await Product.findById(new mongoose.Types.ObjectId(pid));
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      // Find the cart by its ID
      const cart = await Cart.findById(new mongoose.Types.ObjectId(cid));
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const existingProduct = cart.products.find((p) => p.product.equals(pid));
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();

      return cart.products;
    } catch (error) {
      throw new Error("Error adding product to cart: " + error.message);
    }
  }
}

module.exports = CartManager;
