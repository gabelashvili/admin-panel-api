import express from 'express';
import multer from 'multer';
import path from 'path';

import GameController from '@/controllers/game.js';
import GameValidations from '@/validations/game-validations.js';
import checkAuth from '../middleware/check-auth.js';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, 'game-' + uuid() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3000000 },
}).single('image');

const router = express.Router();

router.post('/', upload, checkAuth, GameValidations.addGame, GameController.addGame);

export default router;
