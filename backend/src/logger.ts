import pino from 'pino';

const logger = pino(
  {
    level: process.env.ENV === 'PROD' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  },
  process.stdout
);

export default logger;
