const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const handlebars = require("express-handlebars");
const ProductRoute = require("./routes/product.routes.js");
const HomeRoute = require("./routes/home.routes.js");
const cors = require("cors");
// --------------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Middleware to pass the io object to routers
app.use((req, res, next) => {
  req.app.io = io;
  next();
});

// Routes
app.use("/", HomeRoute);
app.use("/api/product", ProductRoute);

let products = [];

// Socket handshake
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send stored messages to the newly connected client
  socket.emit("initialProducts", products);
});

httpServer.listen(8080, () => {
  console.log("Server listening on port 8080");
});

module.exports.io = io;
