import { Request, Response, NextFunction } from 'express';
import { ReceiptRepository } from '../repositories';
import { Prisma, Receipt } from '@prisma/client';


class ReceiptController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const receiptData = req.body as Receipt;

            const requiredFields = ['name', 'product', 'amount', 'price'];
            const missingFields = requiredFields.filter(field => !(field in receiptData));

            if (missingFields.length > 0) {
                return next({
                    status: 400,
                    message: 'Missing required fields',
                });
            }

            const receipt = await ReceiptRepository.create(receiptData);

            res.locals = {
                status: 201,
                message: 'Receipt created',
                data: receipt,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { receiptId } = req.params;

            const receipt = await ReceiptRepository.findById(Number(receiptId));

            if (!receipt) {
                return next({
                    status: 404,
                    message: 'Receipt not found',
                });
            }

            res.locals = {
                status: 200,
                data: receipt,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { receiptId } = req.params;

            const receipt = await ReceiptRepository.delete(Number(receiptId));

            if (!receipt) {
                return next({
                    status: 404,
                    message: 'Receipt not found',
                });
            }

            res.locals = {
                status: 200,
                message: 'Receipt deleted',
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new ReceiptController();
