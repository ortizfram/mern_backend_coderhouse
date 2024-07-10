// middlewares/errorMiddleware.js

const { ErrorTypes } = require("./errors");

 function errorMiddleware(err, req, res, next) {
  if (err.type in ErrorTypes) {
    return res.status(400).json({ error: err.type, message: err.message });
  }
  next(err);
}

module.exports = errorMiddleware;
