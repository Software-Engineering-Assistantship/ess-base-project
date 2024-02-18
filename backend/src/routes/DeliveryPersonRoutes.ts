import { Router } from 'express';
import { DeliveryPersonController } from '@controllers';
const deliveryPersonRouter = Router();

deliveryPersonRouter.route('/').post(DeliveryPersonController.create);

deliveryPersonRouter.route('/cpf/:cpf').get(DeliveryPersonController.readByCPF);
deliveryPersonRouter.route('/:cpf').patch(DeliveryPersonController.update);
deliveryPersonRouter
  .route('/address/:cpf')
  .patch(DeliveryPersonController.updateAddress);
export default deliveryPersonRouter;
