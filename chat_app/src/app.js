const express = require("express");
const handlebars = require("express-handlebars");
const viewsRoutes = require("./routes/views.routes.js");
const { Server } = require("socket.io");

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

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });

  socket.on("disconnect", () => {
    // Remove user from connectedUsers array
    connectedUsers = connectedUsers.filter((u) => u.id !== socket.id);
  });
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRoutes);
