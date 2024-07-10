const express = require("express");
const compression = require("express-compression");

const app = express();
const port = 3000;

app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

// Generar una gran cadena de texto
const generateLargeString = () => {
  let largeString = "";
  for (let i = 0; i < 100000; i++) {
    largeString += "Esta es una gran cadena de texto. ";
  }
  return largeString;
};

// Endpoint para devolver una gran cadena de texto
app.get("/", (req, res) => {
  const largeString = generateLargeString();

  res.send(largeString);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
