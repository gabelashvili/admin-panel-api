import expressAsyncHandler from 'express-async-handler';
import GameModel from '../models/game.js';

// @desc    Add new image
// @route   POST /api/games
// @access  Private
const addGame = expressAsyncHandler(async (req, res, next) => {
  console.log(req.file, 22);
  if (!req.file) {
    throw new Error('validationError');
  }
  await GameModel.create({ ...req.body, image: req.file.filename });

  return res.status(200).json({ message: 'OK', data: null });
});

export default {
  addGame,
};
