import { DeliveryPersonRepository } from '../repositories';
import { Request, Response, NextFunction } from 'express';
import { Address, DeliveryPerson, Prisma } from '@prisma/client';

class DeliveryPersonController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryPersonData, addressData } = req.body as {
        deliveryPersonData: DeliveryPerson;
        addressData: Address;
      };

      console.log('DELIVERY PERSON DATA', deliveryPersonData);

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
      const address = await DeliveryPersonRepository.createAddress({
        ...addressData,
        DeliveryPerson: { connect: { cpf: deliveryPersonData.cpf } },
      });
      res.locals = {
        status: 201,
        message: 'User created',
        data: { user, address },
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
      const address = await DeliveryPersonRepository.findAddressByCpf(
        user?.cpf,
      );
      res.locals = {
        status: 200,
        data: { user, address },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.params;
      const { deliveryPersonData: userData, addressData } = req.body as {
        deliveryPersonData: Prisma.DeliveryPersonUpdateInput;
        addressData: Prisma.AddressUncheckedUpdateInput;
      };

      const user = await DeliveryPersonRepository.findBycpf(cpf);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      const address = await DeliveryPersonRepository.findAddressByCpf(cpf);

      if (!address) {
        return next({
          status: 404,
          message: 'Address not found',
        });
      }

      const userUpdate = await DeliveryPersonRepository.update(cpf, userData);
      const addressUpdate = await DeliveryPersonRepository.updateAddress(
        cpf,
        addressData,
      );

      res.locals = {
        status: 200,
        data: {
          userUpdate,
          addressUpdate,
        },
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
