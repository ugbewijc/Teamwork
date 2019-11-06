const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, prettyPrint,
} = format;


// Create the logger
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    format.printf(info => `${info.timestamp} - [${info.level}]: ${info.message}`),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/log.txt' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.txt' }),
  ],
});

module.exports = logger;
