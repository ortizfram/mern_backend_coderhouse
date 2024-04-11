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

// Socket listener for new product
socket.on('newProduct', (product) => {
  // Append the new product to the existing list
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML += `<p>(${product.code}) - ${product.title} - $${product.price}</p>`;
});

// Socket listener for deleted product
socket.on('deletedProduct', (productId) => {
  // Remove the deleted product from the list
  const productElement = document.getElementById(`product_${productId}`);
  if (productElement) {
    productElement.remove();
  }
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
