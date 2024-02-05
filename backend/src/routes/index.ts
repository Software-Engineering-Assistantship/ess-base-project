import { Express, Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import ShoppingCartController from '../controllers/ShoppingCartController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post('/restaurants', RestaurantController.insert);

router.get('/restaurants', RestaurantController.index);

router.post('/shopping-cart', ShoppingCartController.insert);

router.get('/shopping-cart', ShoppingCartController.index);

router.delete('/shopping-cart', ShoppingCartController.remove);

export default router;
