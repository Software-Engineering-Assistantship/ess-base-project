import { Router } from 'express';
import { ItensController } from '../controllers';

const itensRouter = Router();

itensRouter.route('/')
  .post(
    ItensController.create,
  );

itensRouter.route('/:itemId')
  .get(
    ItensController.read,
  );

itensRouter.route('/:itemId')
  .delete(
    ItensController.delete,
  );

itensRouter.route('/:itemId')
  .patch(
    ItensController.update,
  );

itensRouter.route('/')
  .get(
    ItensController.findAll,
  );

export default itensRouter;
