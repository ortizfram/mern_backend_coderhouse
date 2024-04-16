// src/ProductManager.js

const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = __dirname + "/productos.json";
    this.getData();
  }

  getData = async () => {
    //   retorna readFile data
    const data = await fs.promises.readFile(this.path);
    return JSON.parse(data);
  };

  deleteProduct = async (code) => {
    let products = await this.getData();
    const product = products.find(
      (product) => product.code === code,
      (err) => {
        if (err) throw new Error("Product not found");
      }
    );
    // filter out id from array
    const filteredP = products.filter((product) => product.code !== code);

    // save
     fs.writeFileSync(this.path, JSON.stringify(filteredP, null, 2));

    console.log("PRODUCT DELETED successfully")

    return filteredP
  };

  async getProducts() {
    try {
      const products = await this.getData();
      return products;
    } catch (error) {
      console.error("Error reading file" + error.message);
    }
  }

  async addProduct({
    title,
    description,
    price,
    status = true,
    stock,
    category,
    thumbnails = [],
  }) {
    try {
      // Read existing products from the file
      let products = await this.getData();

      // Generate the new product ID
      const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

      const code = crypto.randomBytes(4).toString("hex");
      const product = {
        id,
        code,
        title,
        description,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      // Concatenate the new product with the existing products array
      products.push(product);
        
      // Write the updated products array back to the file
      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log("New product added!"); // Log a message indicating success

    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }


  getProductById = async (code) => {
    try {
      const products = await this.getData();
      const product = products.find((product) => product.code === code);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  };
  updateProduct = async (
    id,
    code,
    description,
    price,
    status,
    stock,
    category,
    thumbnails = []
  ) => {
    const products = await this.getData();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    const updatedProduct = {
      id,
      code,
      description,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    products[productIndex] = updatedProduct;

    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf-8");

    return updatedProduct;
  };
}

module.exports = ProductManager;
