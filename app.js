const express = require('express');
const { loggerMiddleware } = require('./logger');
const { prodLogger } = require('./logger');
const { devLogger } = require('./logger');
require('dotenv').config();

const app = express();
app.use(loggerMiddleware);

app.get('/loggerTest', (req, res) => {
  req.logger.debug('This is a debug message');
  req.logger.http('This is an http message');
  req.logger.info('This is an info message');
  req.logger.warning('This is a warning message');
  req.logger.error('This is an error message');
  req.logger.fatal('This is a fatal message');
  res.send({ message: 'Logger test completed!' });
});

app.use("/", (req, res) => {
  res.send({ message: "Prueba de logger!" });
});

app.listen(8080, () => {
  const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;
  logger.info('Server is listening on port 8080');
});
