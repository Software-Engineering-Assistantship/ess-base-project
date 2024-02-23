import { Request, Response, NextFunction } from 'express';
import { PromotionRepository } from '../repositories';
import { Prisma, Promotion } from '@prisma/client';


class PromotionController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const promotionData = req.body as Promotion;

            const checkPromotion = await PromotionRepository.findByCategory(promotionData.category);

            if (checkPromotion) {
                return next({
                    status: 400,
                    message: 'Promotion already exists',
                });
            }

            if (!promotionData.category || !promotionData.start_date || !promotionData.end_date || !promotionData.discount) {
                return next({
                    status: 400,
                    message: 'Missing required fields',
                });
            }

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

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const promotions = await PromotionRepository.findAll();

            res.locals = {
                status: 200,
                data: promotions,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new PromotionController();
