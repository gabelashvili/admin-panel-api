import expressAsyncHandler from 'express-async-handler';
import GameModel from '../models/game.js';

// @desc    Add new game
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

// @desc    Update game
// @route   POST /api/games/:gameId
// @access  Private
const updateGame = expressAsyncHandler(async (req, res, next) => {
  await GameModel.findByIdAndUpdate(
    req.params.gameId,
    { ...req.body, ...(req.file && { image: req.file.filename }) },
    { runValidators: true },
  );

  return res.status(200).json({ message: 'OK', data: null });
});

// @desc    Get All Games
// @route   GET /api/games
// @access  Private
const getGames = expressAsyncHandler(async (req, res, next) => {
  const games = await GameModel.find();
  return res.status(200).json({ message: 'OK', data: games });
});

export default {
  addGame,
  getGames,
  updateGame,
};
