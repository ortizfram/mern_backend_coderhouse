// src/app.js
const express = require("express");
const http = require("http");
const handlebars = require("express-handlebars");
const ProductRoute = require("./routes/product.routes.js");
const IndexRoute = require("./routes/index.routes.js");
const cors = require("cors");
const { Server } = require("socket.io");

// server http
const app = express();
const httpServer = app.listen(8080, () =>
  console.log("listening on port 8080")
);

// server sockets
const socketServer = new Server(httpServer); // server para trabajar con sockets

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
  req.socketServer = socketServer;
  next();
});

// Routes
app.use("/", IndexRoute);

// Pass io object to ProductRoute
app.use(
  "/api/product",
  (req, res, next) => {
    req.socketServer = socketServer;
    next();
  },
  ProductRoute
);

// socket handshake
socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  
});