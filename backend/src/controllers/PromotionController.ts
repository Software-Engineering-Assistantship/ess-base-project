import { Request, Response, NextFunction } from 'express';
import { PromotionRepository } from '../repositories';
import { Prisma, Promotion } from '@prisma/client';


class PromotionController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const promotionData = req.body as Promotion;

            const promotion = await PromotionRepository.create(promotionData);

            res.locals = {
                status: 201,
                message: 'Promotion created',
                data: promotion,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { promotionId } = req.params;

            const promotion = await PromotionRepository.findById(Number(promotionId));

            if (!promotion) {
                return next({
                    status: 404,
                    message: 'Promotion not found',
                });
            }

            res.locals = {
                status: 200,
                data: promotion,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { promotionId } = req.params;

            const promotion = await PromotionRepository.delete(Number(promotionId));

            if (!promotion) {
                return next({
                    status: 404,
                    message: 'Promotion not found',
                });
            }

            res.locals = {
                status: 200,
                message: 'Promotion deleted',
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new PromotionController();
