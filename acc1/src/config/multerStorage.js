const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento de Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/documents";

    if (file.mimetype.startsWith("image/")) {
      if (file.fieldname === "profileImage") {
        folder = "uploads/profiles";
      } else if (file.fieldname === "productImage") {
        folder = "uploads/products";
      }
    }

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
