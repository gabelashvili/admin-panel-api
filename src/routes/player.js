import express from 'express';
import PlayerController from '@/controllers/player.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', checkAuth, PlayerController.getPlayers);

export default router;
