import expressAsyncHandler from 'express-async-handler';
import PlayerModel from '../models/player.js';

// @desc    Get all players
// @route   GET /api/players
// @access  Private
const getPlayers = expressAsyncHandler(async (req, res, next) => {
  const page = parseInt(req.params.page, 10) || 0;
  const pageSize = parseInt(req.params.pageSize, 10) || 15;
  const players = await PlayerModel.find()
    .skip(pageSize * page)
    .limit(pageSize);

  return res.status(200).json({ message: 'OK', data: players });
});

export default {
  getPlayers,
};
