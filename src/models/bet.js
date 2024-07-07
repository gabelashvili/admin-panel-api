import mongoose from 'mongoose';

const BetSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    win: {
      type: Number,
      required: true,
    },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
  },
  {
    timestamps: true,
  },
);

const BetModel = mongoose.model('Bet', BetSchema);

export default BetModel;
