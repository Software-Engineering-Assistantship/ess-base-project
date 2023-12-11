import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';

import {
  UserRepository,
  TokenRepository,
  CookieRepository,
} from '@repositories';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        return next({
          status: 400,
          message: 'Invalid credentials.',
        });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return next({
          status: 400,
          message: 'Invalid credentials.',
        });
      }

      const accessToken = TokenRepository.generateAccessToken(user.id, '60s');
      const refreshToken = TokenRepository.generateRefreshToken(user.id, '5d');

      CookieRepository.setCookie(res, 'refresh_token', refreshToken);

      const { password: _, ...loggedUser } = user;

      res.locals = {
        status: 200,
        message: 'User logged',
        data: {
          loggedUser,
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refresh_token;

      console.log(refreshToken);

      if (!refreshToken) {
        delete req.headers.authorization;

        return next({
          status: 401,
          message: 'Invalid token',
        });
      }

      const decodedRefreshToken =
        TokenRepository.verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        delete req.headers.authorization;

        return next({
          status: 401,
          message: 'Invalid token',
        });
      }

      const user = await UserRepository.findById(decodedRefreshToken.id);

      if (!user) {
        return next({
          status: 400,
          message: 'User not found',
        });
      }

      CookieRepository.clearCookies(res, 'refresh_token');

      const newRefreshToken = TokenRepository.generateRefreshToken(
        user.id,
        '1d',
      );
      const acessToken = TokenRepository.generateAccessToken(user.id, '30s');

      CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);

      const { password: _, ...loggedUser } = user;

      res.locals = {
        status: 200,
        message: 'Token refreshed',
        data: {
          loggedUser,
          acessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      CookieRepository.clearCookies(res, 'refresh_token');
      delete req.headers.authorization;

      res.locals = {
        status: 200,
        message: 'User logged out',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
