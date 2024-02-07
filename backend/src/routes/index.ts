import { Express, Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import ShoppingCartController from '../controllers/ShoppingCartController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post('/restaurants', RestaurantController.insert);

router.get('/restaurants', RestaurantController.index);

ShoppingCartController.setupRoutes(router);

export default router;
