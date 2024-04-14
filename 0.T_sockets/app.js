const express = require("express");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.routes.js");
const { Server } = require("socket.io");

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("listening on port 8080")
);

// server para sockets
const socketServer = new Server(httpServer); // server para trabajar con sockets

// templates
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public")); //pasar archivos js a plantillas
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  // desde client hacia server : ESCUCHA
  socket.on("client", (data) => console.log(data));

  // 3 maneras EMITIR: desde server hacia client
  socket.emit("actual", "s=>c : solo socket actual");
  socket.broadcast.emit("!actual", "s=>c : todos menos socket actual");
  socketServer.emit("para_todos", "s=>c : para todos sockets");
});
