import winston, { format, transports } from "winston";

const logger = winston.createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.colorize({ all: true }),
    }),
    new transports.File({
      level: "warn",
      filename: "./src/logs/warn.log",
    }),
    new transports.File({
      level: "error",
      filename: "./src/logs/error.log",
    }),
  ],
});

export default logger;
