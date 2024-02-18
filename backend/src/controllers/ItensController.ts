import { Request, Response, NextFunction } from 'express';
import { ItensRepository } from '../repositories';
import { Prisma, Item } from '@prisma/client';

class ItensController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const itemData = req.body as Item;
        const checkItem = await ItensRepository.findByName(itemData.name);
        
        if (checkItem) {
            return next({
                status: 400,
                message: 'Item already exists',
            });
        }
        if (!itemData.name || !itemData.amount || !itemData.description || !itemData.price || !itemData.image || !itemData.colors || !itemData.sizes || !itemData.category) {
            return next({
                status: 400,
                message: 'Missing required fields',
            });
        }
        const item = await ItensRepository.create(itemData);

        res.locals = {
            status: 201,
            message: 'Item created',
            data: item,
        };

        return next();
    } catch (error) {
        return next(error);
    }
}

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const item = await ItensRepository.findById(Number(itemId));

      if (!item) {
        return next({
          status: 404,
          message: 'Item not found',
        });
      }

      res.locals = {
        status: 200,
        data: item,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;
      const itemData = req.body as Prisma.ItemUpdateInput

      const item = await ItensRepository.update(Number(itemId), itemData);

      if (!item) {
        return next({
          status: 404,
          message: 'Item not found',
        });
      }

      res.locals = {
        status: 200,
        data: item,
        message: 'Item updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const itens = await ItensRepository.findAll();

      res.locals = {
        status: 200,
        data: itens,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const item = await ItensRepository.delete(Number(itemId));

      if (!item) {
        return next({
          status: 404,
          message: 'Item not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'Item deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ItensController();
