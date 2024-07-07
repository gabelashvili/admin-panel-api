import expressAsyncHandler from 'express-async-handler';
import PlayerModel from '../models/player.js';

// @desc    Get all players
// @route   GET /api/players
// @access  Private
const getPlayers = expressAsyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 0;
  const pageSize = parseInt(req.query.pageSize, 10) || 15;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(req.query.search);
  const players = await PlayerModel.find({
    $or: [{ userName: { $regex: searchRgx, $options: 'i' } }],
  })
    .skip(pageSize * page)
    .limit(pageSize)
    .sort({ [req.query.sortBy || 'userName']: req.query.sortDir === 'asc' ? 1 : -1 })
    .populate('transactions');

  const totalCount = await PlayerModel.countDocuments({
    $or: [{ userName: { $regex: searchRgx, $options: 'i' } }],
  });
  return res.status(200).json({ message: 'OK', data: { players, totalCount } });
});

// @desc    Get player
// @route   GET /api/players/:playerId
// @access  Private
const getPlayer = expressAsyncHandler(async (req, res, next) => {
  const player = await PlayerModel.findById(req.params.playerId).populate('transactions totalBetAmount totalWinAmount');
  if (!player) {
    throw new Error('notFound');
  }
  return res.status(200).json({ message: 'OK', data: player });
});

export default {
  getPlayers,
  getPlayer,
};
