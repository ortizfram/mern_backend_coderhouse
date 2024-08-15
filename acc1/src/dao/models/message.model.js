const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        user: { type: String, required: true },// correo
        message: { type: String, required: true }
  });

module.exports.messageSchema = mongoose.model("Message", messageSchema, "messages");
