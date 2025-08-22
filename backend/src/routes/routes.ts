import { Router } from 'express';
import { buscarAcomodacoes } from '../controllers/reservation.controller';

const router = Router();

router.get('/buscar-acomodacoes', buscarAcomodacoes);

export default router;