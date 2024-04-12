// src/public/js/index.js

const socket = io();

// Function to render products
function renderProducts(products) {
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  products.forEach(product => {
    productosDiv.innerHTML += `<p>(${product.code}) - ${product.title} - $${product.price}</p>`;
  });
}

// Socket listener for initial products
socket.on('initialProducts', (products) => {
  renderProducts(products);
});

// Listen for the newProduct event
socket.on('newProduct', (product) => {
  // Add the new product to the UI
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML += `<p>(${product.code}) - ${product.title} - $${product.price}</p>`;
});

// Fetch and display products initially
async function fetchAndShowProducts() {
  try {
    const response = await fetch('/api/product');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndShowProducts);
