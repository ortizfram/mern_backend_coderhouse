// socket.js
const socket = io();

const saveProd = (title, description, price, status, stock, category,files) => {
  socket.emit("client:newprod", {
    title,
    description,
    price,
    status,
    stock,
    category,
    files
  });
};

// 
socket.on("server:ping", data=> console.log(data))
socket.emit("client:pong","pong")
