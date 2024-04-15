// main.js
const prodForm = document.querySelector("#prodForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

prodForm.addEventListener("submit", (e) => {
  e.preventDefault();

//   if (savedId) {
//     // actualizando
//     updateNote(savedId, title.value, description.value);
//   } else {
    // creando
    saveProd(title.value, description.value);
//   }
//   title.value = ""
//   description.value = ""

//   title.focus()
});
