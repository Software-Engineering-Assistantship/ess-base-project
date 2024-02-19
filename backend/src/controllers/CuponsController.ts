import { Request, Response, NextFunction } from 'express';
import { CuponsRepository } from '../repositories';
import { Prisma, Cupom } from '@prisma/client';


class CuponsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const cupomData = req.body as Cupom;

            const cupom = await CuponsRepository.create(cupomData);

            res.locals = {
                status: 201,
                message: 'Cupom created',
                data: cupom,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { cupomId } = req.params;

            const cupom = await CuponsRepository.findById(Number(cupomId));

            if (!cupom) {
                return next({
                    status: 404,
                    message: 'Cupom not found',
                });
            }

            res.locals = {
                status: 200,
                data: cupom,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { cupomId } = req.params;

            const cupom = await CuponsRepository.delete(Number(cupomId));

            if (!cupom) {
                return next({
                    status: 404,
                    message: 'Cupom not found',
                });
            }

            res.locals = {
                status: 200,
                message: 'Cupom deleted',
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const cupons = await CuponsRepository.findAll();

            res.locals = {
                status: 200,
                data: cupons,
            };

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

export default new CuponsController();
