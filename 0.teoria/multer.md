# 👁️ Ejemplo: configurando multer para poder utilizar un “uploader”

## 🧰 configurar en utils/multer.js

```js
const multer = require("multer");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "public/img"); // Directorio donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    //hace referencia al nombre que contendra el archivo
    cb(null, file.originalname); // Nombre del archivo en el disco
  },
});

const uploader = multer({ storage });

module.exports = uploader;
```

## ✋ Utilizar uploader

```js
router.post('/', uploader.single('file'), (req,res)={})
```

## 💯 Ejemplo implementación MULTER a partir de su uploader

```js
router.post('/', uploader.single('file), (req,res)={

if(!req.file) {
    return res.status(404).json("No se pudo guardar la imagen")
}
console.log(req.file)
let user = req.body
user.profile = req.file.path
users.push(user)
return res.json("user created")
})

export default router
```
<!-- Cuando subimos un archivo (imagen, vídeo, etc), estamos hablando de un flujo de datos. lo cual no puede plasmarse en un JSON. Cuando enviamos información a un endpoint donde sabemos que utilizamos MULTER, debemos enviarlo como FormData, no como JSON. -->
