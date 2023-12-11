import { Router } from 'express';
import { LoginController } from '../controllers';

const AuthRouter = Router();

AuthRouter.route('/')
  .post(
    LoginController.login,
  );

AuthRouter.route('/')
  .patch(
    LoginController.refresh,
  );

AuthRouter.route('/')
  .delete(
    LoginController.logout,
  );

export default AuthRouter;
