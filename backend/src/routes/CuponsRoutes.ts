import { Router } from 'express';
import { CuponsController } from '../controllers';

const cuponsRouter = Router();

cuponsRouter.route('/')
  .post(
    CuponsController.create,
  );

cuponsRouter.route('/:cuponsId')
  .get(
    CuponsController.read,
  );

cuponsRouter.route('/:cuponsId')
  .delete(
    CuponsController.delete,
  );

export default cuponsRouter;
