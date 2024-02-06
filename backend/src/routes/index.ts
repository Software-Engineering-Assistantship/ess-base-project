import { Router } from 'express';

import UserRouter from './UserRoutes';
import deliveryPersonRouter from './DeliveryPersonRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/deliveryperson', deliveryPersonRouter);
router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
