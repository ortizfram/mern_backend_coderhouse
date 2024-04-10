const express = require("express");
const router = express.Router();

let messages = [];


router.get("/", (req, res) => {
  res.render("index", {messages:messages}); //handlebars template
});

router.post("/message", (req, res) => {
  const newMessage = {
    socketid: req.body.socketid,
    message: req.body.message
  };
  messages.push(newMessage);
  // Emitimos el nuevo mensaje a todos los clientes
  req.app.io.emit("message", newMessage);
  res.sendStatus(200);
});


module.exports = router;
