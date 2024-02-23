import { Router } from 'express';
import { CardPaymentController } from '../controllers';

const paymentRouter = Router();

paymentRouter.route('/')
  .post(
    CardPaymentController.create,
  );

  paymentRouter.route('/:number')
  .get(
    CardPaymentController.readByNumber,
  );

  paymentRouter.route('/:card_id')
  .delete(
    CardPaymentController.delete,
  );

export default paymentRouter;