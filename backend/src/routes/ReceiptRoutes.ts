import { Router } from 'express';
import { ComprovanteController } from '../controllers';

const comprovanteRouter = Router();

comprovanteRouter.route('/')
  .post(
    ComprovanteController.create,
  );

comprovanteRouter.route('/:comprovanteId')
  .get(
    ComprovanteController.read,
  );

comprovanteRouter.route('/:comprovanteId')
  .delete(
    ComprovanteController.delete,
  );

export default comprovanteRouter;