import { Router } from 'express';
import { RatingController } from '../controllers';

const ratingRouter = Router();

ratingRouter.route('/')
  .post(
    RatingController.create,
  );

ratingRouter.route('/:itemId')
  .get(
    RatingController.read,
  );

ratingRouter.route('/:ratingId')
  .delete(
    RatingController.delete,
  );

ratingRouter.route('/:ratingId')
  .patch(
    RatingController.update,
  );

ratingRouter.route('/')
  .get(
    RatingController.findAll,
  );

export default ratingRouter;