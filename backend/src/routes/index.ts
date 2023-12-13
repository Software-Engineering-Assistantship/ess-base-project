import { Router } from 'express';

import UserRouter from './UserRoutes';

const router = Router();

router.use('/user', UserRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
