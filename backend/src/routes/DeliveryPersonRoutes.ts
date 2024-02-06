import { Router } from 'express';
import { DeliveryPersonController } from '@controllers';
const deliveryPersonRouter = Router();

deliveryPersonRouter.post('/', DeliveryPersonController.create);

deliveryPersonRouter.get('/cpf/:cpf', DeliveryPersonController.readByCPF);

deliveryPersonRouter.get('/name/:name', DeliveryPersonController.readByName);

deliveryPersonRouter.patch('/:cpf', DeliveryPersonController.update);

export default deliveryPersonRouter;
