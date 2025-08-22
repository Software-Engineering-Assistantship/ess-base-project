import express from 'express';
import { seriesCurtidas, curtir, descurtir } from '../controllers/like.controllers.js';

const router = express.Router();

router.get('/seriesCurtidas/:userid', seriesCurtidas);
router.put('/curtir/:userid', curtir);
router.put('/descurtir/:userid', descurtir);

export default router;
