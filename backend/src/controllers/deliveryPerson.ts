import { DeliveryPersonRepository } from '../repositories';
import { Request, Response, NextFunction } from 'express';
import { DeliveryPerson, Prisma } from '@prisma/client';

class DeliveryPersonController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryPersonData = req.body as DeliveryPerson;

      const existsUserWithCpf = await DeliveryPersonRepository.findBycpf(
        deliveryPersonData.cpf,
      );

      if (existsUserWithCpf) {
        return next({
          status: 400,
          message: 'This cpf is already registered',
        });
      }

      const existsUserWithEmail = await DeliveryPersonRepository.findBycpf(
        deliveryPersonData.email,
      );

      if (existsUserWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registered',
        });
      }

      const user = await DeliveryPersonRepository.create(deliveryPersonData);

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

  async readByCPF(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;

      const user = await DeliveryPersonRepository.findBycpf(cpf);

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

  async readByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;

      const users = await DeliveryPersonRepository.findByName(name);

      if (!users || users.length === 0) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: users,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const userData = req.body as Prisma.DeliveryPersonUpdateInput;

      const user = await DeliveryPersonRepository.update(cpf, userData);

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
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const addressData = req.body as Prisma.AddressUncheckedUpdateInput;

      const updatedDeliveryPerson =
        await DeliveryPersonRepository.updateAddress(cpf, addressData);

      res.locals = {
        status: 200,
        data: updatedDeliveryPerson,
        message: 'Address updated for the delivery person',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new DeliveryPersonController();
