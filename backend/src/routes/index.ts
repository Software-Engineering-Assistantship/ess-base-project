import { Router } from 'express';

import UserRouter from './UserRoutes';

import ComprovanteRouter from './ComprovanteRoutes';

const router = Router();

router.use('/user', UserRouter);

router.use('/comprovante', ComprovanteRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
