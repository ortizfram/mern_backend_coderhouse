// socket.js
const socket = io();

//  test
socket.on("server:ping", (data) => console.log(data));
socket.emit("client:pong", "pong");

const saveProd = (
  title,
  description,
  price,
  status,
  stock,
  category,
  thumbnails
) => {
  socket.emit("client:newprod", {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails,
  });
};

const deleteProd = (code) => {
  socket.emit("client:deleteprod", code);
};
const getProd = (code) => {
  socket.emit("client:getprod", code);
};

socket.on("server:newprod", appendProd); //ui render prods

socket.on("server:loadprods", renderProds);

socket.on("server:selectedprod", (prod) => {
  // const title = document.querySelector("#title");
  // const description = document.querySelector("#description");

  // title.value = prod.title;
  // description.value = prod.description;

  // savedId = prod.code; //comes from global ui
  console.log("slected to update ", prod);
});
