import { Router } from 'express';
import { ItensController } from '../controllers';

const itensRouter = Router();

itensRouter.route('/')
  .post(
    ItensController.create,
  );

itensRouter.route('/:cuponsId')
  .get(
    ItensController.read,
  );

itensRouter.route('/:cuponsId')
  .delete(
    ItensController.delete,
  );


export default itensRouter;
