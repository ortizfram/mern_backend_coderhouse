// ui.js
const prodList = document.querySelector("#prods");

const prodUI = (prod) => {
    console.log(prod);
  
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2">
    <div class="d-flex justify-content-between">
    <h1 class="h3 card-title">${prod.title}</h1>
    <div>
    <button class="btn btn-danger delete" data-id="${prod.id}">Delete</button>
    <button class="btn btn-secondary update" data-id="${prod.id}">update</button>
    </div>
    </div>
    <p>${prod.description}</p>
    </div>`;
  
   const btnDelete = div.querySelector(".delete")
   const btnUpdate = div.querySelector(".update")
   btnDelete.addEventListener('click', ()=>{
      deleteProd(btnDelete.dataset.id) 
   })
   btnUpdate.addEventListener('click', ()=>{
      getProd(btnUpdate.dataset.id) 
      // console.log(btnUpdate.dataset.id) 
   })
  
   return div
  };

  const renderProds = (prods) => {
   prodList.innerHTML = ""
 prods.forEach((prod) => {
   prodList.append(prodUI(prod))
 });
};

const appendNote = prod => {
   prodList.append(prodUI(prod))
}