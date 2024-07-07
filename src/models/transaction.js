import mongoose from 'mongoose';

const TransactionsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'outcome'],
      default: 'income',
    },
    status: {
      type: String,
      enum: ['fulfilled', 'pending'],
      default: 'fulfilled',
    },
    transactionDate: {
      type: Date,
    },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
  },
  {
    timestamps: true,
  },
);

const TransactionModel = mongoose.model('Transaction', TransactionsSchema);

export default TransactionModel;
