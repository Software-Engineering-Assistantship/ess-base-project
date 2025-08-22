import express from "express";
import { signup, login, logout} from '../controllers/auth.controllers.js';

const router = express.Router();

// POST
router.post('/signup', signup)
router.post('/login', login);

// DELETE
router.delete('/logout', logout);

export default router