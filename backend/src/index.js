import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000"
  }))

// Route imports
import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import filmesRoutes from './routes/filmes.routes.js'
import likeRoutes from './routes/like.routes.js';
import recomendationsRoutes from './routes/recomendations.routes.js';

app.use('/user', likeRoutes);
app.use('/user', recomendationsRoutes);
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/filmes', filmesRoutes)

app.listen(4000);