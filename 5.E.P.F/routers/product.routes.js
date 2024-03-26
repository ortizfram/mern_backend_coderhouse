const { Router } = require("express");
const { uploader } = require("../utils/multer");
const ProductManager = require("../ProductManager");

const router = Router();

// getProducts
router.get("/products", async (req, res) => {
  try {
    const products = await ProductManager.getProducts();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getProductById
router.get("/product/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  try {
    const product = await ProductManager.getProductById(pid);
    res.json({success:"found",product});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// addProduct
router.post("/product", uploader.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(404).json("No se pudo guardar la imagen");
  }
  const { title, description, price, status, stock, category } = req.body;
  const thumbnail = req.file.path;
  const reqProduct = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
  const product = await ProductManager.addProduct(reqProduct);
  console.log(product);
  res.status(201).json({success:"added",product});
});

// updateProduct
router.put("/product/:pid", async (req, res) => {
  // fetch product
  let pid = parseInt(req.params.pid);
  try {
    const product = await ProductManager.getProductById(pid);
    res.status(200).json({message:"found",product:product.id});
  } catch (error) {
    res.status(404).json({ message:"Product not Found",error: error.message });
  }

  // req new fields
  if (!req.file) {
    return res.status(404).json("No se pudo guardar la imagen");
  }
  const { title, description, price, status, stock, category } = req.body;
  const thumbnail = req.file.path;
  const updatedP = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
  const product = await ProductManager.updateProduct(pid,updatedP);
  return res.status(200).json({success:"updated",product:product})
})

// deleteProduct
router.delete("/product/:pid", async (req, res) => {
  // fetch product
  let pid = parseInt(req.params.pid);
  try {
    const product = await ProductManager.deleteProduct(pid);
    res.status(200).json({success:"deleted",product:pid});
  } catch (error) {
    res.status(404).json({ message:"Product not Found",error: error.message });
  }

  // req new fields
  if (!req.file) {
    return res.status(404).json("No se pudo guardar la imagen");
  }
  const { title, description, price, status, stock, category } = req.body;
  const thumbnail = req.file.path;
  const updatedP = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
  const product = await ProductManager.updateProduct(pid,updatedP);
  return res.status(200).json({message:"updated",product:product})
})

module.exports = router;
