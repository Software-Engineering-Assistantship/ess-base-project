import { Express, Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

router.post('/restaurants', RestaurantController.insert);

router.get('/restaurants', RestaurantController.index);

export default router;
