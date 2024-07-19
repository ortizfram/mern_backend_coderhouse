// config/config.js
require("dotenv").config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

module.exports = {
  JWT_SECRET: String(process.env.JWT_SECRET),
  MONGODB_URI: String(process.env.MONGODB_URI),
  SESSION_SECRET: String(process.env.SESSION_SECRET),
};
