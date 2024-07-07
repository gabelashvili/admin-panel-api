import express from 'express';

import UserRoutes from '@/routes/user.js';
import GameRoutes from '@/routes/game.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the API root!');
});

router.use('/users', UserRoutes);
router.use('/games', GameRoutes);

export default router;
