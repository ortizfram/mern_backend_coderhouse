const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  role: { type: String, default: "user" },
  githubId: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
