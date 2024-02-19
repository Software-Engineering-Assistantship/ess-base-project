import { Request, Response, NextFunction } from 'express';
import { DeliveryRepository } from '../repositories';
import { Prisma, Delivery } from '@prisma/client';

interface DeliveryDataDto extends Delivery {
    ItemsId: number[]
}

class DeliveryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const deliveryData = req.body as DeliveryDataDto;
        
        if (deliveryData.ItemsId.length == 0) {
            return next({
                status: 400,
                message: 'Missing required item',
            });
        }
        const delivery = await DeliveryRepository.create(deliveryData);

        res.locals = {
            status: 201,
            message: 'Delivery created',
            data: delivery,
        };

        return next();
    } catch (error) {
        return next(error);
    }
}

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryId } = req.params;

      const delivery = await DeliveryRepository.findById(Number(deliveryId));

      if (!delivery) {
        return next({
          status: 404,
          message: 'Delivery not found',
        });
      }

      res.locals = {
        status: 200,
        data: delivery,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryId } = req.params;
      const deliveryData = req.body as Prisma.DeliveryUpdateInput

      const delivery = await DeliveryRepository.update(Number(deliveryId), deliveryData);

      if (!delivery) {
        return next({
          status: 404,
          message: 'Delivery not found',
        });
      }

      res.locals = {
        status: 200,
        data: delivery,
        message: 'Delivery updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const delivery = await DeliveryRepository.findAll();

      res.locals = {
        status: 200,
        data: delivery,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryId } = req.params;

      const delivery = await DeliveryRepository.delete(Number(deliveryId));

      if (!delivery) {
        return next({
          status: 404,
          message: 'Delivery not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'Delivery deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new DeliveryController();
