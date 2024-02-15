import { Express, Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
//import ShoppingCartController from '../controllers/ShoppingCartController';
import OrderCancellationController from '../controllers/OrderCancellationController';
import OrdersController from '../controllers/OrdersController';
import RestaurantModel from '../models/RestaurantModel';
import ShoppingCartController from '../controllers/ShoppingCartController';
import ClientLoginController from '../controllers/ClientLoginController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post(
  '/restaurants',
  RestaurantController.validate('insert'),
  RestaurantController.insert
);

router.post('/orders', OrdersController.insert);

router.put('/orders/:orderId', OrdersController.update);

router.get('/restaurants', RestaurantController.index);

router.delete('/restaurants/:id', RestaurantController.delete);

router.put(
  '/restaurants/:id',
  RestaurantController.validate('update'),
  RestaurantController.update
);

ShoppingCartController.setupRoutes(router);

router.get('/clients/:clientId/orders', OrderCancellationController.index);

router.put(
  '/clients/:clientId/orders/:orderId/cancellation',
  OrderCancellationController.update
);

export default router;
