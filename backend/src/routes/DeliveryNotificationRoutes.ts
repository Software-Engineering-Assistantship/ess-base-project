import { Router } from 'express';
import { DeliveryNotificationController } from '../controllers';

const DeliveryNotificationRouter = Router();

DeliveryNotificationRouter.route('/:deliveryId')
  .post(
    DeliveryNotificationController.create,
  );

DeliveryNotificationRouter.route('/:deliveryId')
  .patch(
    DeliveryNotificationController.update,
  );

export default DeliveryNotificationRouter;