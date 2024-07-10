const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    /** guardar logs importantes tipo warn en un archivo aparte */
    new winston.transports.File({ filename: "./errors.log", level: "warn" }),
  ],
});

/** a partir de un middleware agregamos logger y probamos*/
const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`
  );
  next();
};

module.exports = addLogger;
