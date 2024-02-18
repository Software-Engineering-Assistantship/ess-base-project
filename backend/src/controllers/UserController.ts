import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { Prisma, User } from '@prisma/client';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as User

      const existsUserWithEmail = await UserRepository.findByEmail(
        userData.email,
      );

      if (existsUserWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const userDataWithHashedPassword = {
        ...userData,
        password: await hash(userData.password, 6),
      };

      const user = await UserRepository.create(userDataWithHashedPassword);

      res.locals = {
        status: 201,
        message: 'User created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await UserRepository.findById(Number(userId));

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = req.body as Prisma.UserUpdateInput

      const user = await UserRepository.update(Number(userId), userData);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
        message: 'User updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await UserRepository.delete(Number(userId));

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
