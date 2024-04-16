// main.js

if (savedId) {
  // actualizando
  // updateNote(savedId, title.value, description.value);
  console.log("id", savedId);
} else {
  // creando
  saveProd(title, description, price, status, stock, category, files);
}

title.value = "";
description.value = "";
price.value = "";
status = "";
stock = "";
category = "";
files = "";

title.focus();

module.exports = addProduct;
