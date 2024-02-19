import { Router } from 'express';

import UserRouter from './UserRoutes';
import deliveryPersonRouter from './DeliveryPersonRoutes';
import itensRouter from './ItensRoutes';
import PromotionRouter from './PromotionRoutes';
import cuponsRouter from './CuponsRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/deliveryperson', deliveryPersonRouter);
router.use('/itens', itensRouter);
router.use('/promotion', PromotionRouter);
router.use('/cupons', cuponsRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
