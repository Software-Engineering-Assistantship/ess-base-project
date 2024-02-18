import { Router } from 'express';

import UserRouter from './UserRoutes';

import CategoriesRouter from './CategoriesRouter';

const router = Router();

router.use('/user', UserRouter);

router.use('/categories', CategoriesRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
