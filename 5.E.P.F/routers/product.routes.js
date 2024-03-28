const { Router } = require("express");
const uploader = require("../utils/multer.js");
const ProductManager = require("../ProductManager.js");

const router = Router();
const productManager = new ProductManager();

// getProducts
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getProductById
router.get("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(pid);
    res.json({ success: "found", product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// addProduct
router.post("/", uploader.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(404).json("No se pudieron guardar las imágenes");
    }

    const { title, description, price, status, stock, category } = req.body;
    const thumbnails = req.files.map(file=> file.path);

    // Create an object with the product data
    const reqProduct = {
      title,
      description,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    // Call the addProduct method on the productManager instance
    await productManager.addProduct(reqProduct);

    // Respond with a success message
    res.status(201).json({ success: "Product added successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
});

// updateProduct
router.put("/:pid", uploader.array("files"), async (req, res) => {
  // fetch product
  let pid = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(pid);
    // res.status(200).json({ message: "found", product: product.id });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Product not Found", error: error.message });
  }

  // req new fields
  if (!req.files || req.files.length === 0) {
    return res.status(404).json("No se pudieron guardar las imágenes");
  }
  const { title, description, price, status, stock, category } = req.body;
  const thumbnails = req.files.map(file=>file.path);
  const updatedP = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const product = await productManager.updateProduct(pid, updatedP);
  return res.status(200).json({ success: "updated", product: product });
});

// deleteProduct
router.delete("/:pid", async (req, res) => {
  // fetch product
  let pid = parseInt(req.params.pid);
  try {
    const product = await productManager.deleteProduct(pid);
    res.status(200).json({ success: "deleted", product: pid });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Product not Found", error: error.message });
  }

  // req new fields
  if (!req.file) {
    return res.status(404).json("No se pudo guardar la imagen");
  }
  const { title, description, price, status, stock, category } = req.body;
  const thumbnails = req.files.path;
  const updatedP = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const product = await ProductManager.updateProduct(pid, updatedP);
  return res.status(200).json({ message: "updated", product: product });
});

module.exports = router;
