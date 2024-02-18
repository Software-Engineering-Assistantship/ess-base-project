import { Router } from 'express';

import UserRouter from './UserRoutes';

import ReceiptRouter from './ReceiptRoutes';

const router = Router();

router.use('/user', UserRouter);

router.use('/receipt', ReceiptRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
