import { Router } from 'express';

import UserRouter from './UserRoutes';
import deliveryPersonRouter from './DeliveryPersonRoutes';
import itensRouter from './ItensRoutes';
import deliveryRouter from './DeliveryRoutes';
import ratingRouter from './RatingRoutes';
import PromotionRouter from './PromotionRoutes';
import cuponsRouter from './CuponsRoutes';import CategoriesRouter from './CategoriesRoutes';

import ReceiptRouter from './ReceiptRoutes';

import DeliveryNotificationRouter from './DeliveryNotificationRoutes';
import paymentRouter from './CardPaymentRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/deliveryperson', deliveryPersonRouter);
router.use('/itens', itensRouter);
router.use('/delivery', deliveryRouter);
router.use('/rating', ratingRouter);

router.use('/promotion', PromotionRouter);
router.use('/cupons', cuponsRouter);

router.use('/categories', CategoriesRouter);

router.use('/receipt', ReceiptRouter);
router.use('/delivery-notifications', DeliveryNotificationRouter);
router.use('/payment_methods', paymentRouter)

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
