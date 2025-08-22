import express from "express";
import { getAll, getUserById, updateUser, deleteUser } from '../controllers/user.controllers.js';

const router = express.Router();

/* */

// GET
router.get('/', getAll);
router.get('/:userId', getUserById);

// PUT
router.put('/:userId', updateUser);

// DELETE
router.delete('/:userId', deleteUser);

export default router