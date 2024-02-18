import OtherRepository from '../repositories/other.repository';
import TestRepository from '../repositories/test.repository';
import UserRepository from '../repositories/user.repository';
import PromocaoRepository from '../repositories/promocao.repository';
import TestService from '../services/test.service';
import UserService from '../services/user.service';
import PromocaoService from '../services/promocao.service';
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

// Promocao
di.registerRepository(PromocaoRepository, new PromocaoRepository());
di.registerService(
  PromocaoService,
  new PromocaoService(
    di.getRepository(PromocaoRepository),
  )
);