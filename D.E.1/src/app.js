// src/app.js
const express = require("express");
const http = require("http");
const { Server: WebSocketServer } = require("socket.io");
const handlebars = require("express-handlebars");
const ProductRoute = require("./routes/product.routes.js");
const IndexRoute = require("./routes/index.routes.js");
const cors = require("cors");

// server
const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server); // server para trabajar con sockets

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// templates
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Middleware to pass the io object to routers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/", IndexRoute);
app.use("/api/product", ProductRoute);

// socket handshake

io.on("connection", (socket) => {
  //socket: traer info de cliente
  console.log("cliente conectado", socket.id);

  // socket.emit("server:loadnotes", notes);

  // test
  socket.emit("server:ping", "ping");
  socket.on("client:pong", (data) => console.log(data));
});

// LISTEN
server.listen(8080, () => console.log("listening 8080"));
