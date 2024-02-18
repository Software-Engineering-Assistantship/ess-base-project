import { Router } from 'express';
import { ReceiptController } from '../controllers';

const receiptRouter = Router();

receiptRouter.route('/')
  .post(
    ReceiptController.create,
  );

  receiptRouter.route('/:receiptId')
  .get(
    ReceiptController.read,
  );

  receiptRouter.route('/:receiptId')
  .delete(
    ReceiptController.delete,
  );

export default receiptRouter;