import { Router } from 'express';
import { ordenarAcomodacoes } from '../controllers/order.controller';

const router = Router();

router.get('/ordenar-acomodacoes', ordenarAcomodacoes);

export default router;
