import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import ProductService from '../services/product.service';
import CarrinhoService from '../services/carrinho.service';
import ProductController from '../controllers/product.controller';
import CarrinhoController from '../controllers/carrinho.controller';
import PromocaoController from '../controllers/promocao.controler'; // Importa o controlador de promocao
import PromocaoService from '../services/promocao.service'; // Import the PromocaoService class
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import EmailController from '../controllers/email.controller';
import EmailService from '../services/email.service';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.get('/helloworld', (req, res) => { 
    res.send('Hello World');
  });

  app.use(
    prefix,
    new PromocaoController(router, di.getService(PromocaoService)).router
  );

  app.use(
    prefix,
    new UserController(router, di.getService(UserService), di.getService(CarrinhoService)).router
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
  
  app.use(
    prefix,
    new EmailController(router, di.getService(EmailService)).router
  );

  app.use(
    prefix,
    new LoginController(router, di.getService(LoginService)).router
  );
}
