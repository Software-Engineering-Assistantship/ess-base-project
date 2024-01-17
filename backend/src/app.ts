import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use(router);

export default app;
