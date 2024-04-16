// src/routes/product.routes.js
const { Router } = require("express");
const uploader = require("../utils/multer.js");
const ProductManager = require("../ProductManager.js");

const router = Router();
const pm = new ProductManager();

// addProduct
router.post("/", uploader.array("files"), async (req, res) => {
  try {
    const { title, description, price, status, stock, category } = req.body;
    const thumbnails = req.files.map((file) => {
      // Extract filename from the full path
      const filename = file.path.split("\\").pop(); // Assuming Windows environment
      // const filename = file.path.split("/").pop(); // Use this for Unix-like environments
      return filename;
    });

    const reqProduct = {
      title,
      description,
      price: parseFloat(price), // Parse price as a float
      status: status === "on", // Convert checkbox value to boolean
      stock: parseInt(stock), // Parse stock as an integer
      category,
      thumbnails,
    };

    // Call the addProduct method on the productManager instance
    await pm.addProduct(reqProduct);

    // Emit a socket event with the updated products data
    req.io.emit("server:newprod", reqProduct);

    res.status(200).render("realTimeProducts", {});
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
});

// deleteProduct
router.delete("/:code", async (req, res) => {
  try {
    // Parse the product code from the request parameters
    const code = parseInt(req.params.code);

    // Delete the product
    await pm.deleteProduct(code);

    // Emit an event to notify connected clients about the product deletion
    req.io.emit("productDelete", { code });

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

// getProducts
router.get("/", async (req, res) => {
  try {
    const products = await pm.getProducts();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getProductById
router.get("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  try {
    const product = await pm.getProductById(pid);
    res.json({ success: "found", product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// updateProduct
router.put("/:pid", uploader.array("files"), async (req, res) => {
  // Fetch product
  const pid = parseInt(req.params.pid);
  try {
    let product = await pm.getProductById(pid);

    // Handle if product not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract updated fields from request body
    const { description, price, status, stock, category } = req.body;
    const thumbnails = req.files.map((file) => file.path);

    // Update product fields
    product.description = description;
    product.price = price;
    product.status = status;
    product.stock = stock;
    product.category = category;
    product.thumbnails = thumbnails;

    // Save updated product
    product = await pm.updateProduct(pid, product);

    // Return success response
    return res.status(200).json({ success: "updated", product });
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
