const fs = require("fs");
const ProductManager = require("./ProductManager.js");

class CartManager {
  constructor() {
    this.carritos = [];
    this.path = "./carrito.json";
    this.productManager = new ProductManager();
    this.getData();
  }

  getData() {
    // leer archivo
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.carritos = JSON.parse(data);
    } catch (err) {
      this.carritos = [];
    }
  }

  saveData() {
    // escribir archivo
    fs.writeFileSync(this.path, JSON.stringify(this.carritos), "utf8");
  }

  newId() {
    return parseInt(Date.now());
  }

  async newCart() {
    const nuevoCarrito = {
      id: this.newId(),
      products: [],
    };
    this.carritos.push(nuevoCarrito);
    this.saveData();
    return nuevoCarrito;
  }

  async listProdsInCart(cid) {
    const carrito = this.carritos.find((c) => c.id === cid);
    return carrito ?  { id: carrito.id, products: carrito.products } : null;
  }

  async addProdToCart(cid, pid) {
    const product = await this.productManager.getProductById(pid);
    const carrito = this.carritos.find((c) => c.id === cid);
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    const existingProduct = carrito.products.find((p) => p.product === pid);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      carrito.products.push({ product: pid, quantity: 1 });
    }

    this.saveData();
    return carrito.products;
  }
}

module.exports = CartManager;
