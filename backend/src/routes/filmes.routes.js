import express from 'express';
import { getAcaoJson,getSuspenseJson, getAventuraJson,getTerrorJson,getDramaJson, getComediaJson,getRomanceJson, getDiretorJson} from '../controllers/filmes.controllers.js';

const router = express.Router()


//GET
router.get('/acao', getAcaoJson)
router.get('/aventura', getAventuraJson)
router.get('/terror', getTerrorJson)
router.get('/drama', getDramaJson)
router.get('/comedia', getComediaJson)
router.get('/romance', getRomanceJson)
router.get('/suspense', getSuspenseJson)






export default router
