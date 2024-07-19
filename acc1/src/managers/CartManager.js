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

    const unprocessed = [];
    const purchase = [];

    for (const cart_item of cart.products) {
        const product = await Product.findById({ _id: new mongoose.Types.ObjectId(cart_item.product) });
        if (!product) {
            unprocessed.push({
                product: cart_item.product,
                reason: "Product not found"
            });
            console.error(`Product with ID ${cart_item.product} not found.`);
            continue;
        }

        let remainingQuantity = cart_item.quantity;
        
        while (product.stock > 0 && remainingQuantity > 0) {
            const quantityToProcess = Math.min(product.stock, remainingQuantity);

            purchase.push({
                product: product,
                quantity: quantityToProcess
            });

            product.stock -= quantityToProcess;
            remainingQuantity -= quantityToProcess;
            await product.save();

            console.log("Product added to purchase: ", product.title, " Quantity: ", quantityToProcess);
        }

        if (remainingQuantity > 0) {
            unprocessed.push({
                product: product.title,
                reason: "Insufficient stock"
            });
            console.log("Unprocessed product due to insufficient stock: ", product.title);
        }
    }

    console.log(`\n purchase: ${JSON.stringify(purchase, null, 2)}\n`);
    console.log(`\n unprocessed: ${JSON.stringify(unprocessed, null, 2)}\n`);

    let totalAmount = 0;
    for (const purchase_item of purchase) {
        console.log("Adding to total: ", purchase_item.product.price, " * ", purchase_item.quantity);
        totalAmount += purchase_item.product.price * purchase_item.quantity;
    }
    console.log("Total: $", totalAmount);

    if (totalAmount > 0) {
        const ticket = new ticketSchema({
            code: `TCKT-${Date.now()}`,
            amount: totalAmount,
            purchaser: userId
        });
        await ticket.save();

        // Remove processed cart_items from the cart
        cart.products = cart.products.filter(cart_item => !purchase.some(p => p.product._id.equals(cart_item.product._id)));
        await cart.save();

        console.log("Ticket created: ", ticket);
        return { ticket, purchase, unprocessed };
    } else {
        console.error('No cart_items were processed for purchase.');
        throw new Error('No cart_items processed');
    }
}

}

module.exports = CartManager;
