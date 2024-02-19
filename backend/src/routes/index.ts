import { Router } from 'express';

import UserRouter from './UserRoutes';
import itensRouter from './ItensRoutes';
import CategoriesRouter from './CategoriesRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/itens', itensRouter);

router.use('/categories', CategoriesRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
