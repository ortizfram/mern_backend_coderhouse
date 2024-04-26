const express = require("express");
const ProductRoute = require("./routers/product.routes.js");
const CartRoute = require("./routers/cart.routes.js");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const ViewsRoute = require("./chat_app/src/routes/views.routes.js");
const { messageSchema:Message } = require("./dao/models/message.model.js");



const app = express();
const httpServer = app.listen(8080, () => console.log("Listening port 8080"));
const io = new Server(httpServer);

// Store connected users & messages
let connectedUsers = [];
let messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("authenticate", (user) => {
    // Add user to connectedUsers array
    connectedUsers.push(user);
    // Emit chat logs to the newly authenticated user
    socket.emit("chatLogs", messages);
    // Broadcast to all other users that a new user has connected
    socket.broadcast.emit("newUserConnected", user);
  });

  socket.on("message", async (data) => {
    try {
      // Save the message to MongoDB using the Mongoose Message model
      const message = await Message.create(data);
      // Emit the message to all clients
      io.emit("messageLogs", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    // Remove user from connectedUsers array
    connectedUsers = connectedUsers.filter((u) => u.id !== socket.id);
  });
});

// use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
mongoose
  .connect(
    "mongodb+srv://ortizfram:cGLEWsgUqdXZNLoZ@codercluster.lmawmpi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// view engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/chat_app/src/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// routes
app.use("/", ViewsRoute)
app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);
