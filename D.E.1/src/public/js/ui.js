// ui.js
const prodList = document.querySelector("#prods");

const prodUI = (prod) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2">
    <div class="d-flex justify-content-between">
    <h1 class="h3 card-title">${prod.title}</h1>
    <div>
    <button class="btn btn-danger delete" data-code="${prod.code}">Delete</button>
    <button class="btn btn-secondary update" data-code="${prod.code}">update</button>
    </div>
    </div>
    <p>${prod.description}</p>
    </div>`;
  
   //  selector & listener
   const btnDelete = div.querySelector(".delete")
   const btnUpdate = div.querySelector(".update")
   btnDelete.addEventListener('click', ()=>{
      deleteProd(btnDelete.dataset.code) 
   })
   btnUpdate.addEventListener('click', ()=>{
      getProd(btnUpdate.dataset.code) 
   })
   return div
  };

//   functions
  const renderProds = (prods) => {
   prodList.innerHTML = ""
 prods.forEach((prod) => {
   prodList.append(prodUI(prod))
 });
};
const appendNote = prod => {
   prodList.append(prodUI(prod))
}