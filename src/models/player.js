import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    totalBet: {
      type: Number,
      required: true,
    },
    totalWin: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

const PlayerModel = mongoose.model('Player', PlayerSchema);

export default PlayerModel;
