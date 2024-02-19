import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import UserController from '../controllers/user.controller'; // Importa o controlador de usuário
import UserService from '../services/user.service'; // Import the UserService class
import ProductService from '../services/product.service';
import CarrinhoService from '../services/carrinho.service';
import ProductController from '../controllers/product.controller';
import CarrinhoController from '../controllers/carrinho.controller';

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

  app.use(
    prefix,
    new ProductController(router, di.getService(ProductService)).router
  )

  app.use(
    prefix,
    new CarrinhoController(router, di.getService(CarrinhoService)).router
  )
};
