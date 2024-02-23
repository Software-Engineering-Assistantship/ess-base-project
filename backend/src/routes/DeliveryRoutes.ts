import { Router } from 'express';
import { DeliveryController } from '../controllers';

const deliveryRouter = Router();

deliveryRouter.route('/')
  .post(
    DeliveryController.create,
  );

deliveryRouter.route('/:deliveryId')
  .get(
    DeliveryController.read,
  );

deliveryRouter.route('/:deliveryId')
  .delete(
    DeliveryController.delete,
  );

deliveryRouter.route('/:deliveryId')
  .patch(
    DeliveryController.update,
  );

deliveryRouter.route('/')
  .get(
    DeliveryController.findAll,
  );

export default deliveryRouter;