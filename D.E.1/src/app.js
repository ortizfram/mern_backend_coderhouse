const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const indexRoutes = require("./routes/index.router.js");
const handlebars = require("express-handlebars");

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

// Middleware para pasar el objeto io a los routers
app.use((req, res, next) => {
  req.app.io = io;
  next();
});

// routes
app.use("/", indexRoutes);

let messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Enviamos los mensajes almacenados al cliente recién conectado
  socket.emit("initialMessages", messages);

  socket.on("message", (data) => {
    console.log(data);
    const newMessage = {
      socketid: socket.id,
      message: data
    };
    messages.push(newMessage);
    // Emitimos el nuevo mensaje a todos los clientes
    io.emit("message", newMessage);
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
