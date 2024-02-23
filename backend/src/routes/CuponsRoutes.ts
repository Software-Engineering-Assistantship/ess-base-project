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

cuponsRouter.route('/')
  .get(
    CuponsController.findAll,
  );

cuponsRouter.route('/:cuponsName')
  .get(
    CuponsController.findByName,
  );

export default cuponsRouter;
