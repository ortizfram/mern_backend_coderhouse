// main.js
let prodForm = document.querySelector("#prodForm");
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
let stock = document.querySelector("#stock");
let status = document.querySelector("#status");
let category = document.querySelector("#category");
let thumbnails = document.querySelector("#thumbnails");

prodForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Retrieve input field values
   title = title.value;
   description = description.value;
   price = parseFloat(price.value); // Parse price as a float
   stock = parseInt(stock.value); // Parse stock as an integer
   status = status.checked; // Use checked property for checkbox
   category = category.value;
   files = thumbnails.files; // Get the selected files

  // Call the saveProd function with the input values
  saveProd(title, description, price, status, stock, category, files);

//   if (savedId) {
//     // actualizando
//     updateNote(savedId, title.value, description.value);
//   } else {
    // creando
//   }
//   title.value = ""
//   description.value = ""

//   title.focus()
});
