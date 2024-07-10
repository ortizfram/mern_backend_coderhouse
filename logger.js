const winston =require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "http" })],
});

/** a partir de un middleware agregamos logger y probamos*/
const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`
  );
  next();
};

module.exports = addLogger
