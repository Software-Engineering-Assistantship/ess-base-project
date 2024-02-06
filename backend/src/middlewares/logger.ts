import { createLogger, format, transports, Logger, addColors } from 'winston';

const logsDir = './logs/';

const formatters = [format.timestamp(), format.json()];

const loggerRequestTransports: transports.StreamTransportInstance[] = [
  new transports.File({
    level: 'error',
    filename: `${logsDir}requestErrors.log`,
    handleExceptions: true,
    handleRejections: true,
  }),
];

if (process.env.NODE_ENV !== 'production') {
  formatters.push(format.prettyPrint());
  loggerRequestTransports.push(
    new transports.File({
      level: 'info',
      filename: `${logsDir}requestInfo.log`,
    }),
    new transports.File({
      level: 'warn',
      filename: `${logsDir}requestWarnings.log`,
    }),
    new transports.Console({
      level: 'warn',
      format: format.combine(
        ...formatters,
        format.colorize({ all: true }),
        format.printf((info) => {
          const { timestamp, message, meta } = info;
          let requestBody;
          let responseBody;
          try {
            requestBody = JSON.stringify(meta.req.body, null, 2);
          } catch (e) {
            requestBody = meta.req?.body;
          }
          try {
            responseBody = JSON.stringify(meta.res.body, null, 2);
          } catch (e) {
            responseBody = meta.res?.body;
          }

          const statusCode = meta.res?.statusCode;

          return `[${timestamp}] ${message} - ${statusCode}\n\n${
            requestBody ? `Request Body: ${requestBody}\n` : ''
          }Response Body: ${responseBody}`;
        }),
      ),
      handleExceptions: true,
      handleRejections: true,
    }),
  );
  addColors({
    info: 'blue',
    error: 'red',
    warn: 'yellow',
  });
}

export const requestLogger: Logger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(...formatters),
});
