import { Router } from 'express';
import { CategoriesController } from '../controllers';

const categoriesRouter = Router();

categoriesRouter.route('/')
  .post(
    CategoriesController.create,
  );

categoriesRouter.route('/')
  .get(
    CategoriesController.readAll,
  );

categoriesRouter.route('/:id')
  .get(
    CategoriesController.read,
  );

categoriesRouter.route('/:id')
  .delete(
    CategoriesController.delete,
  );

categoriesRouter.route('/:id')
  .patch(
    CategoriesController.update,
  );

export default categoriesRouter;