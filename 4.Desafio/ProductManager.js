import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./Products.json";
  }

  getData = async () => {
    //   retorna readFile data
    const data = await fs.promises.readFile(this.path);
    return data;
  };

  pathValidation = async () => {
    if (!fs.existsSync(this.path)) {
      throw new Error("File not found!");
    }
  };

  addProduct(title, description, price, thumbnail, stock) {
    const id = this.products.length + 1;
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

    fs.promises.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw new Error("Error writing json");
    });
  }
  getProducts = async () => {
    await this.pathValidation();

    try {
      const data = await this.getData();
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.error("Error reading file" + error.message);
    }
  };
  getProductById = async (id) => {
    await this.pathValidation();

    const data = await this.getData();
    const products = JSON.parse(data);
    const pFound = products.find((product) => product.id === id);
    if (pFound === -1) {
      throw new Error("Product not found");
    }
  };
  updateProduct = async (id, title, description, price, thumbnail, stock) => {
    await this.pathValidation();
    const data = await this.getData();
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

    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf-8");

    return products[productIndex];
  };
  deleteProduct = async (id) => {
    await this.pathValidation();

    const data = await this.getData();
    const products = JSON.parse(data);
    const pFound = products.find(
      (product) => product.id === id,
      (err) => {
        if (err) throw new Error("Product not found");
      }
    );
    // filter out id from array
    const filteredP = products.filter((product) => product.id !== id);

    // save
    fs.writeFileSync(this.path, JSON.stringify(filteredP, null, 2));

    return "Product deleted successfully";
  };
}

export default ProductManager;
