//  src/public/index.js
const socket = io();

function handleProductRefresh(products) {
  const productList = document.getElementById("productos");

  // Clear previous products if any
  productList.innerHTML = "";

  // Add new products
  products.forEach((product) => {
    const productItem = document.createElement("ul");
    productItem.textContent = product.title;
    productList.appendChild(productItem);
  });
}

socket.on("productUpdate", ({ products }) => {
  handleProductRefresh(products);
});
