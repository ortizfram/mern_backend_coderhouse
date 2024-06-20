const fs = require("fs");
const crypto = require("crypto");
const { productSchema: Product } = require("../dao/models/product.model.js");
const { mongoose } = require("mongoose");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "acc1/src/dao/productos.json";
    this.getData();
  }

  getData = async () => {
    // FS---------------
    // retorna readFile data
    // const data = await fs.promises.readFile(this.path);
    // return JSON.parse(data);
    // mongo ------------------
    const data = await Product.find({});
    return data;
  };

  async addProduct({
    title,
    description,
    price,
    status = "active",
    stock,
    category,
    //thumbnails = [],
  }) {
    try {
      // Read existing products from the file for FS
      //let products = await this.getData();

      // Generate the new product ID
      // const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

      const code = crypto.randomBytes(4).toString("hex");
      // const product = {
      //   // id,
      //   code,
      //   title,
      //   description,
      //   price,
      //   status,
      //   stock,
      //   category,
      //   //thumbnails,
      // };

      // Concatenate the new product with the existing products array
      // products.push(product);

      // Write the updated products array back to the file
      // await fs.promises.writeFile(this.path, JSON.stringify(products));
      // Create a new product instance using the Product model
      const newProduct = new Product({
        //code,
        title,
        description,
        price:parseFloat(price),
        status,
        stock:parseInt(stock),
        category,
       // thumbnails,
      });

      // Save the new product to the database
      await newProduct.save();

      console.log("New product added!"); // Log a message indicating success
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }

  async getProducts() {
    try {
      const products = await this.getData();
      return products;
    } catch (error) {
      console.error("Error reading file" + error.message);
    }
  }
  getProductById = async (pid) => {
    try {
      // const products = await this.getData();
      // const product = products.find((product) => product.id === id);

      // Find the product by ID in the database
      let product = await Product.findById({
        _id: new mongoose.Types.ObjectId(pid),
      });

      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  };
  updateProduct = async (
    pid,
    {
      title,
      description,
      price,
      status,
      stock,
      category,
      //thumbnails = []
    }
  ) => {
    // const products = await this.getData();
    // const productIndex = products.findIndex((product) => product.id === id);

    // if (productIndex === -1) {
    //   throw new Error("Product not found");
    // }

    // const updatedProduct = {
    //   id,
    //   code,
    //   description,
    //   price,
    //   status,
    //   stock,
    //   category,
    //   thumbnails,
    // };

    // products[productIndex] = updatedProduct;

    // fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf-8");

    // return updatedProduct;
    // Find the product by ID in the database
    try {
      // Find the product by ID in the database
      let product = await Product.findById({
        _id: new mongoose.Types.ObjectId(pid),
      });

      if (!product) {
        throw new Error("Product not found");
      }

      // Update the product fields
      if (title !== undefined && title !== "") product.title = title;
      if (description !== undefined && description !== "") product.description = description;
      if (price !== undefined && price !== "" || price !== null) product.price = parseFloat(price);
      if (status !== undefined && status !== "") product.status = status;
      if (stock !== undefined && stock !== ""|| stock !==null) product.stock = parseInt(stock, 10);
      if (category !== undefined && category !== "") product.category = category;
      //product.thumbnails = thumbnails;

      // Save the updated product to the database
      await product.save();

      return product;
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  };

  deleteProduct = async (pid) => {
    // const products = await this.getData();
    // const product = products.find(
    //   (product) => product.id === id,
    //   (err) => {
    //     if (err) throw new Error("Product not found");
    //   }
    // );
    // // filter out id from array
    // const filteredP = products.filter((product) => product.id !== id);

    // // save
    // fs.writeFileSync(this.path, JSON.stringify(filteredP, null, 2));

    // return product;
    try {
      // Find the product by ID in the database
      let product = await Product.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(pid),
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  };
}

module.exports = ProductManager;
