import CarrinhoRepository from '../repositories/carrinho.repository';
import OtherRepository from '../repositories/other.repository';
import ProductRepository from '../repositories/product.repository';
import TestRepository from '../repositories/test.repository';
import UserRepository from '../repositories/user.repository';
import CarrinhoService from '../services/carrinho.service';
import ProductService from '../services/product.service';
import TestService from '../services/test.service';
import UserService from '../services/user.service';
import Injector from './injector';

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
