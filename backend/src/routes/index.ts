import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import UserController from '../controllers/user.controller'; // Importa o controlador de usuário
import UserService from '../services/user.service'; // Import the UserService class

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.get('/helloworld', (req, res) => { 
    res.send('Hello World');
  });

  app.use(
    prefix,
    new UserController(router, di.getService(UserService)).router
  );

  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
