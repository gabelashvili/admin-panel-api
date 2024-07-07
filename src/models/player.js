import mongoose from 'mongoose';
import TransactionModel from './transaction.js';

const PlayerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    lastVisitDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: true,
  },
);

PlayerSchema.virtual('transactions', {
  ref: TransactionModel,
  localField: '_id',
  foreignField: 'playerId',
});

PlayerSchema.virtual('totalBetAmount', {
  ref: TransactionModel,
  localField: '_id',
  foreignField: 'playerId',
}).get((item) => item?.reduce((acc, cur) => acc + cur.amount, 0));

PlayerSchema.virtual('totalWinAmount', {
  ref: TransactionModel,
  localField: '_id',
  foreignField: 'playerId',
}).get((item) => item?.reduce((acc, cur) => acc + cur.win, 0));

const PlayerModel = mongoose.model('Player', PlayerSchema);

export default PlayerModel;
