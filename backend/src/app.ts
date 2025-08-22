import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import logger from './logger';
import { HttpError } from './utils/errors/http.error';
import { FailureResult } from './utils/result';
import router from '../src/routes/index';
import path from 'path';

const app: express.Express = express();
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use(router);

app.use(
  (
    error: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.status >= 500) {
      logger.error(error.toString());
    }

    new FailureResult({
      message: error.msg ?? error.message,
      status: error.status,
    }).handle(res);
  }
);



export default app;