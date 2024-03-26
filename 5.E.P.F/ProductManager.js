const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "Products.json";
  }

  getData = async () => {
    //   retorna readFile data
    const data = await fs.promises.readFile(this.path);
    return JSON.parse(data);
  };


  async addProduct(title, description, price, status=true,stock,category,thumbnail=null ) {
    try {
      let products = this.products;

      // Generar el nuevo producto
      const id = products.length + 1;
      const code = crypto.randomBytes(4).toString("hex");
      const product = {
        id,
        code,
        title,
        description,
        price,
        status,
        stock,
        category
      };

        // Add the optional thumbnail if provided
    if (thumbnail !== null) {
        product.thumbnail = thumbnail;
      }

      // Agregar el nuevo producto a la lista
      products.push(product);

      // Escribir los datos actualizados en el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log("New products added!"); // Devolver el nuevo producto añadido
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }
  async getProducts () {

    try {
      const products = await this.getData();
      return products;
    } catch (error) {
      console.error("Error reading file" + error.message);
    }
  };
  getProductById = async (id) => {
    try {
      const products = await this.getData();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  };
  updateProduct = async (id, title, description, price,status,stock,category, thumbnail) => {
    const products = await this.getData();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    products[productIndex] = {
      id,
      title,
      description,
      price,
      status,
      stock,
      category,
      thumbnail
    };

    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf-8");

    return products[productIndex];
  };
  deleteProduct = async (id) => {

    const products = await this.getData();
    const product = products.find(
      (product) => product.id === id,
      (err) => {
        if (err) throw new Error("Product not found");
      }
    );
    // filter out id from array
    const filteredP = products.filter((product) => product.id !== id);

    // save
    fs.writeFileSync(this.path, JSON.stringify(filteredP, null, 2));

    return product;
  };
}

module.exports = ProductManager;