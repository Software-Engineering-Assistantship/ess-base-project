import { Request, Response, NextFunction } from 'express';
import { RatingRepository } from '../repositories';
import { Prisma, Rating } from '@prisma/client';
import deliveryRepository from '../repositories/deliveryRepository';

class RatingController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const ratingData = req.body as Rating;
        
        if (!ratingData.rating) {
            return next({
                status: 400,
                message: 'Missing required field',
            });
        }
        const delivery = await deliveryRepository.findById(ratingData.deliveryId)

        if (delivery?.status != 'entregue') {
            return next({
                status: 400,
                message: 'Rating not allowed yet',
            });
        }
        const rating = await RatingRepository.create(ratingData);

        res.locals = {
            status: 201,
            message: 'Rating created',
            data: rating,
        };

        return next();
    } catch (error) {
        return next(error);
    }
}

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const rating = await RatingRepository.findById(Number(itemId));

      if (!rating) {
        return next({
          status: 404,
          message: 'Rating not found',
        });
      }

      res.locals = {
        status: 200,
        data: rating,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { ratingId } = req.params;
      const ratingData = req.body as Prisma.RatingUpdateInput

      const rating = await RatingRepository.update(Number(ratingId), ratingData);

      if (!rating) {
        return next({
          status: 404,
          message: 'Rating not found',
        });
      }

      res.locals = {
        status: 200,
        data: rating,
        message: 'Rating updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await RatingRepository.findAll();

      res.locals = {
        status: 200,
        data: rating,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { ratingId } = req.params;

      const rating = await RatingRepository.delete(Number(ratingId));

      if (!rating) {
        return next({
          status: 404,
          message: 'Rating not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'Rating deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new RatingController();
