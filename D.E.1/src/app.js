// src/app.js
const express = require("express");
const http = require("http");
const handlebars = require("express-handlebars");
const ProductRoute = require("./routes/product.routes.js");
const IndexRoute = require("./routes/index.routes.js");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Create HTTP server
const httpServer = http.createServer(app);

// Integrate socket.io with the HTTP server
const io = socketio(httpServer);

// Middleware to pass the io object to routers
app.use((req, res, next) => {
  req.app.io = io;
  next();
});

// Routes
app.use("/", IndexRoute);

// Pass io object to ProductRoute
app.use(
  "/api/product",
  (req, res, next) => {
    req.io = io;
    next();
  },
  ProductRoute
);

httpServer.listen(8080, () => {
  console.log("Server listening on port 8080");
});

// Emit events when products change
// You should emit this event whenever there's a change in the products data
function emitProductUpdate(products) {
  io.emit("productUpdate", { products });
}
