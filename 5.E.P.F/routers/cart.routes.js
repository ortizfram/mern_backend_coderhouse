const { Router } = require("express");
const { uploader } = require("../utils/multer");

const router = Router();

let carts = [];

router.get("/pets", (req, res) => {
  return res.json({ pets });
});

router.post("/pet", uploader.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(404).json("No se pudo guardar la imagen");
  }
  console.log(req.file);
  const { name } = req.body;
  console.log(name)
  const thumbnail  = req.file.path;
  const newPet = { name, thumbnail };
  pets.push(newPet);
  console.log(newPet);
  res.status(201).json(newPet);
});

module.exports = router;
