// socket.js
const socket = io();

//  test
socket.on("server:ping", (data) => console.log(data));
socket.emit("client:pong", "pong");

const deleteProd = (code) => {
  socket.emit("client:deleteprod", code);
};
const getProd = (code) => {
  socket.emit("client:getprod", code);
};

socket.on("server:newprod", (prod) => console.log(prod)); //ui render prods

socket.on("server:loadprods", renderProds);

