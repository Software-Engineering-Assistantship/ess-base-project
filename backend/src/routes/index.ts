import { Express, Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import ShoppingCartController from '../controllers/ShoppingCartController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post(
  '/restaurants',
  RestaurantController.validate('insert'),
  RestaurantController.insert
);

router.get('/restaurants', RestaurantController.index);

router.delete('/restaurants/:id', RestaurantController.delete);

router.put(
  '/restaurants/:id',
  RestaurantController.validate('update'),
  RestaurantController.update
);

ShoppingCartController.setupRoutes(router);

export default router;
