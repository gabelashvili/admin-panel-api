import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      min: 1,
      unique: true,
    },
    image: {
      type: String,
      min: 5,
    },
  },
  {
    timestamps: true,
  },
);

const GameModel = mongoose.model('Game', GameSchema);

export default GameModel;
