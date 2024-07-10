const winston = require("winston");

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warning: 'yellow',
    error: 'red',
    fatal: 'magenta',
  },
};

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }
  req.logger.http(`${req.method} ${req.url}`);
  next();
};

module.exports = { devLogger, prodLogger, loggerMiddleware };
