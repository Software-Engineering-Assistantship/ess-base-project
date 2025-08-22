import express from 'express';
import cors from 'cors'; // Corrigido para importação de ES Modules
import likeRoutes from './routes/like.routes.js';
import recomendationsRoutes from './routes/recomendations.routes.js';

const app = express();

app.use(cors()); // Permite todas as origens
app.use(express.json());

app.use('/user', likeRoutes);
app.use('/user', recomendationsRoutes);

export default app;
