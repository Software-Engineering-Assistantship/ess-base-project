import { Express, Router } from 'express';
import PromotionController from '../controllers/promotion.controller';
import EmailService from '../services/email.service';
import ReservationController from '../controllers/reservation.controller';
import ClientController from '../controllers/client.controller';
import HotelierController from '../controllers/hotelier.controller';
import AuthController from '../controllers/auth.controller';
import SaveController from '../controllers/save.controller';
import RateController from '../controllers/rate.controller';
import PublishedReservationController from '../controllers/publishedReservation.controller';

import PaymentMethodController from '../controllers/paymentMethod.controller';
// import { di } from '../di';
// import TestController from '../controllers/test.controller';
// import TestService from '../services/test.service';

// const router = Router();
// const prefix = '/api';

// export default (app: Express) => {
//   app.use(
//     prefix,
//     new TestController(router, di.getService(TestService)).router
//   );
// };

const router = Router();

const promotionController = new PromotionController();
const reservationController = new ReservationController();
const clientController = new ClientController();
const hotelierController = new HotelierController();


const saveController = new SaveController();
const rateController = new RateController();
const publishedReservationController = new PublishedReservationController();
const paymentMethodController = new PaymentMethodController()

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});



reservationController.setupRoutes(router);
promotionController.setupRoutes(router);
clientController.setupRoutes(router);
hotelierController.setupRoutes(router);
router.use('/auth', AuthController);
saveController.setupRoutes(router);
rateController.setupRoutes(router);
publishedReservationController.setupRoutes(router);
paymentMethodController.setupRoutes(router)

export default router;
