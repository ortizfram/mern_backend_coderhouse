// /utils
const multer = require("multer");
const path = require("path");


// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img")); // Directorio donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    //hace referencia al nombre que contendra el archivo
    cb(null, `${Date.now()}-` +file.originalname); // Nombre del archivo en el disco
  },
});


module.exports = multer({storage});
