import app from './app';
import logger from './logger';
import Env from './env';

app.listen(Env.PORT, () => {
  logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});
