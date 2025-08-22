import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import { buscarAcomodacoes } from '../controllers/reservation.controller';
import { filtrarAcomodacoes } from '../controllers/filter.controller';
import { ordenarAcomodacoes } from '../controllers/order.controller';

const router = Router();
const prefix = '/api';
router.get('/buscar-acomodacoes', buscarAcomodacoes);
router.get('/filtrar-acomodacoes', filtrarAcomodacoes);
router.get('/ordenar-acomodacoes', ordenarAcomodacoes);


export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
