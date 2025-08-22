import express from 'express';
import { top10, recomendacaoGenero, recomendacaoGeral } from '../controllers/recomendations.controllers.js';

const router = express.Router();

router.get('/top10/Sistema', top10);
router.get('/Sistema/series/:generoid', recomendacaoGenero);
router.get('/Sistema/series', recomendacaoGeral);

export default router;
