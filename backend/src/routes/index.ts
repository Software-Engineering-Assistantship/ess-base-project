import { Router } from 'express';

import UserRouter from './UserRoutes';
import itensRouter from './ItensRoutes';
import deliveryRouter from './DeliveryRoutes';
import ratingRouter from './RatingRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/itens', itensRouter);
router.use('/delivery', deliveryRouter);
router.use('/rating', ratingRouter);


router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
