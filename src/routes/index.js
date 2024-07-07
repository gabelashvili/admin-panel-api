import express from 'express';

import UserRoutes from '@/routes/user.js';
import GameRoutes from '@/routes/game.js';
import PlayerRoutes from '@/routes/player.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the API root!');
});

router.use('/users', UserRoutes);
router.use('/games', GameRoutes);
router.use('/players', PlayerRoutes);

export default router;
