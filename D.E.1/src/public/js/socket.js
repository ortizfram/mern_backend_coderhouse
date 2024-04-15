// socket.js
const socket = io();

//  test
socket.on("server:ping", (data) => console.log(data));
socket.emit("client:pong", "pong");

const deleteProd = (id) => {
  socket.emit("client:deleteprod", id);
};
const getProd = (id) => {
  socket.emit("client:getprod", id);
};

socket.on("server:newprod", (prod) => console.log(prod)); //ui render prods

socket.on("server:loadprods", renderProds);

