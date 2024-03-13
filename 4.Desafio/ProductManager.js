const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.products = []; // Initialize products array
    this.path = "./Products.json";
  }

  async getData() {
    try {
      const data = await fs.promises.readFile(this.path);
      return data;
    } catch (error) {
      throw new Error("Error reading file: " + error.message);
    }
  }

  async pathValidation() {
    try {
      if (!fs.existsSync(this.path)) {
        throw new Error("File not found!");
      }
    } catch (error) {
      throw new Error("Error validating path: " + error.message);
    }
  }

  addProduct = async (title, description, price, thumbnail, stock) => {
    try {
      const id =
        this.products.length > 0
          ? this.products[this.products.length - 1].id + 1
          : 1;
      const code = crypto.randomBytes(4).toString("hex");

      const product = {
        id,
        code,
        title,
        description,
        price,
        thumbnail,
        stock,
      };
      this.products.push(product);

      fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf8",
        (err) => {
          if (err) throw new Error("Error writing json: " + err.message);
        }
      );
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  };

  async getProducts() {
    try {
      await this.pathValidation();
      const data = await this.getData();
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error("Error getting products: " + error.message);
    }
  }

  async getProductById(id) {
    try {
      await this.pathValidation();
      const data = await this.getData();
      const products = JSON.parse(data);
      const pFound = products.find((product) => product.id === id);
      if (!pFound) throw new Error("Product not found");
      return `\n\npFoundById: ${JSON.stringify(pFound)}`;
    } catch (error) {
      throw new Error("Error getting product by ID: " + error.message);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, stock) {
    try {
      await this.pathValidation();
      const data = await this.getData(); // Fetch the latest data
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        throw new Error("Product not found");
      }
  
      products[productIndex] = {
        id,
        title,
        description,
        price,
        thumbnail,
        stock,
      };
  
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
  
      return `\n\nupdated product: ${JSON.stringify(products[productIndex])}`;
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }
  

  async deleteProduct(id) {
    try {
      await this.pathValidation();
      const data = await this.getData();
      let products = JSON.parse(data);

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      const deletedProduct = products.splice(productIndex, 1)[0]; // Remove and capture the deleted product

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2),
        "utf-8"
      );

      return `\n\ndeleted product: ${JSON.stringify(deletedProduct)}`; // Return the deleted product
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

module.exports = ProductManager;
