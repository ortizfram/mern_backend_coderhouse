const express = require("express");
const handlebars = require("express-handlebars");
// import routes
const indexRoutes = require("./routes/index.router.js");
// socket
const socketServer = new Server(httpServer);

const app = express();

// views/layouts/main.hablebars
// views/index.hablebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// app.use(express.static(__dirname + "/public"));

// use Routes
app.use("/", indexRoutes);

app.listen(8080, () => {
  console.log("listening to 8080");

  socketServer.on("connection", (socket) => {
    console.log("nuevo cliente conectado");
    // de socket a server
    socket.on("message", (data) => {
      console.log(data);
    });
    // de server a socket
    socket.emit('evento_para_socket_individual','mensaje unico de socket')
    // all sockets minus the actual one
    socket.broadcast.emit("evento_para_todos",'solo lo reciben los sockets conectados')
  });
});
