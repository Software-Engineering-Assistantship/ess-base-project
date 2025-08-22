import { Router } from 'express';
import { filtrarAcomodacoes } from '../controllers/filter.controller';

const router = Router();

router.get('/filtrar-acomodacoes', filtrarAcomodacoes);

export default router;