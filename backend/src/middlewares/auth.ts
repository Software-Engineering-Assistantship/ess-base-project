import { Request, Response, NextFunction } from 'express';
import { TokenRepository } from '@repositories';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      next({
        status: 401,
        message: 'Unauthorized.',
      });
    } else {
      const [, token] = authToken.split(' ');

      TokenRepository.verifyAccessToken(token);
      next();
    }
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
}
