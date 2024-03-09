import CarrinhoRepository from '../repositories/carrinho.repository';
import OtherRepository from '../repositories/other.repository';
import ProductRepository from '../repositories/product.repository';
import TestRepository from '../repositories/test.repository';
import UserRepository from '../repositories/user.repository';
import CarrinhoService from '../services/carrinho.service';
import ProductService from '../services/product.service';
import PromocaoRepository from '../repositories/promocao.repository';
import TestService from '../services/test.service';
import UserService from '../services/user.service';
import PromocaoService from '../services/promocao.service';
import Injector from './injector';
import EmailRepository from '../repositories/email.repository';
import EmailService from '../services/email.service';
import LoginRepository from '../repositories/login.repository';
import LoginService from '../services/login.service';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

// User
di.registerRepository(UserRepository, new UserRepository());
di.registerService(
  UserService,
  new UserService(
    di.getRepository(UserRepository),
  )
);

// products
di.registerRepository(ProductRepository, new ProductRepository());
di.registerService(
  ProductService,
  new ProductService(
    di.getRepository(ProductRepository)
  )
);

// carrinho
di.registerRepository(CarrinhoRepository, new CarrinhoRepository());
di.registerService(
  CarrinhoService,
  new CarrinhoService(
    di.getRepository(CarrinhoRepository)
  )
);

// Promocao
di.registerRepository(PromocaoRepository, new PromocaoRepository());
di.registerService(
  PromocaoService,
  new PromocaoService(
    di.getRepository(PromocaoRepository)
  )
);

// Email
di.registerRepository(EmailRepository, new EmailRepository());
di.registerService(
  EmailService,
  new EmailService(
    di.getRepository(EmailRepository)
  )
);

// Login
 di.registerRepository(LoginRepository, new LoginRepository());
 di.registerService(
   LoginService,
   new LoginService(
     di.getRepository(LoginRepository)
   )
 );
