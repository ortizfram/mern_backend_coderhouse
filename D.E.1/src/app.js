// src/app.js
const express = require("express");
const http = require("http");
const { Server: WebSocketServer } = require("socket.io");
const handlebars = require("express-handlebars");
const ProductRoute = require("./routes/product.routes.js");
const IndexRoute = require("./routes/index.routes.js");
const cors = require("cors");
const ProductManager = require("./ProductManager.js");

// server
const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server); // server para trabajar con sockets
const pm = new ProductManager();

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

io.on("connection", async (socket) => {
  //socket: traer info de cliente
  console.log("cliente conectado", socket.id);

  // test
  socket.emit("server:ping", "ping");
  socket.on("client:pong", (data) => console.log(data));

  // server:loadprods
  socket.emit("server:loadprods", await pm.getProducts());

  // client:newprod
  socket.on("client:newprod", async(newProd) => {
    const prod = {
      ...newProd,
    };
    console.log(prod);
    // notes.push(note);
    await pm.addProduct(prod)
    io.emit("server:newprod", prod);
  });

  // client:deleteprod
  socket.on("client:deleteprod", async (code) => {
    const products = await pm.deleteProduct(code); //returns the new array
    io.emit("server:loadprods", products);
  });

  // client:getprod
  socket.on("client:getprod", async (code) => {
    const prod = await pm.getProductById(code);
    // console.log("slected ", prod);
    socket.emit("server:selectedprod", prod);
  });
});

// LISTEN
server.listen(8080, () => console.log("listening 8080"));
