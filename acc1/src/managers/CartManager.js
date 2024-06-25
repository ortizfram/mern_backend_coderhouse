const fs = require("fs");
const ProductManager = require("./ProductManager.js");
const mongoose = require("mongoose");
const { cartSchema: Cart } = require("../dao/models/cart.models.js");
const { productSchema: Product } = require("../dao/models/product.model.js");
const { ticketSchema } = require("../dao/models/ticket.model.js");

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
  async  getCartById(cid) {
    try {
      const cart = await Cart.findById({_id:new mongoose.Types.ObjectId(cid)}).exec();
      return cart; // Return the found cart object
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }

  async listProdsInCart(cid) {
    try {
      const cart = await this.getCartById(cid)
      return cart ? cart : null;
    } catch (error) {
      throw new Error("Error fetching cart: " + error.message);
    }
  }

  async addProdToCart({cid, pid}) {
    try {
      const product = await Product.findById({
        _id: new mongoose.Types.ObjectId(pid),
      });
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      // Find the cart by its ID
      const cart = await this.getCartById(cid)
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
  async unlistProdFromCart(cid, pid) {
    try {
      const product = await Product.findById({_id:new mongoose.Types.ObjectId(pid)});
      if (!product) {
        throw new Error("Product not found");
      }
  
      const cart = await Cart.findById({_id:new mongoose.Types.ObjectId(cid)});
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const existingProductIndex = cart.products.findIndex(p => p.product.equals(pid));
      if (existingProductIndex !== -1) {
        if (cart.products[existingProductIndex].quantity > 1) {
          cart.products[existingProductIndex].quantity--;
        } else {
          cart.products.splice(existingProductIndex, 1); // Remove the product from the cart if quantity is 1
        }
        await cart.save();
      }
  
      return cart.products; // Return updated products array
    } catch (error) {
      throw new Error("Error removing product from cart: " + error.message);
    }
  }
  async purchaseCart(cid, userId) {
    const cart = await this.getCartById(cid);
    if (!cart) {
      throw new Error('Cart not found');
    }
  
    const unprocessedProducts = [];
    let totalAmount = 0;
  
    for (const item of cart.products) {
      const product = await Product.findById({_id:new mongoose.Types.ObjectId(item.product)});
      if (!product) {
        unprocessedProducts.push(item.product);
        console.error(`Product with ID ${item.product} not found.`);
        continue;
      }
  
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
        totalAmount += product.price * item.quantity;
      } else {
        unprocessedProducts.push(item.product);
        console.log(`Insufficient stock for product ${product._id}. Requested: ${item.quantity}, Available: ${product.stock}`);
      }
    }
  
    if (totalAmount > 0) {
      const ticket = new ticketSchema({
        code: `TCKT-${Date.now()}`,
        amount: totalAmount,
        purchaser: userId
      });
      await ticket.save();
  
      // Remove processed items from the cart
      cart.products = cart.products.filter(item => !unprocessedProducts.includes(item.product));
      await cart.save();
  
      return { ticket, unprocessedProducts };
    } else {
      console.error('No items were processed for purchase.');
      throw new Error('No items processed');
    }
  }
  
}

module.exports = CartManager;
