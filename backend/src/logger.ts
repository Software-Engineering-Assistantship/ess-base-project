import pino from 'pino';

const logger = pino(
  {
    level: process.env.ENV === 'PROD' ? 'info' : 'debug',
  },
  process.stdout
);

export default logger;
