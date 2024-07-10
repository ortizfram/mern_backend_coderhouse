const winston = require("winston");
require('dotenv').config();


/** 1. Configurar el primer logger (devLogger) para que cuente con un transporte Console a nivel Verbose.*/
const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "verbose" }),
  ],
});

/** 2. Crear además un logger (prodLogger) para que cuente con un transporte Console a nivel http y un transporte File a nivel warn */
const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({ filename: "./actv1_errors.log", level: "warn" }),
  ],
});

/** 3. Configurar el middleware que setea el logger en el objeto req, para que coloque el devLogger, o el prodLogger según sea el entorno.
 */
const loggerMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }
  
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

module.exports = {devLogger,prodLogger, loggerMiddleware};
