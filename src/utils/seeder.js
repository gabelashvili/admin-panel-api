import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import PlayerModel from '../models/player.js';
import mongoose from 'mongoose';
import TransactionModel from '../models/transaction.js';
import BetModel from '../models/bet.js';

dotenv.config();

export function createRandomUser() {
  return {
    userName: faker.internet.userName(),
    level: faker.number.int({ min: 1, max: 5 }),
    lastVisitDate: faker.date.past(),
    blocked: false,
  };
}

export function createRandomTransaction(playerId) {
  return {
    type: faker.helpers.arrayElement(['income', 'outcome']),
    status: faker.helpers.arrayElement(['fulfilled', 'pending']),
    amount: faker.number.int({ min: 1, max: 2326598 }),
    win: faker.number.int({ min: 1, max: 5000 }),
    playerId,
    transactionDate: faker.date.past(),
  };
}

export function createRandomBet(playerId) {
  return {
    amount: faker.number.int({ min: 1, max: 2326598 }),
    win: faker.number.int({ min: 0, max: 2326598 }),
    playerId,
    createdAt: faker.date.past(),
  };
}

export const players = faker.helpers.multiple(createRandomUser, {
  count: 80,
});

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(async () => {
    const data = await PlayerModel.insertMany(players);
    const transactions = data
      .map((el) => faker.helpers.multiple(() => createRandomTransaction(el._id), { count: faker.number.int({ min: 1, max: 30 }) }))
      .flat();
    const bets = data
      .map((el) => faker.helpers.multiple(() => createRandomBet(el._id), { count: faker.number.int({ min: 1, max: 30 }) }))
      .flat();
    await TransactionModel.insertMany(transactions);
    await BetModel.insertMany(bets);
    console.log('Seeder succeed...');
    process.exit(1);
  })
  .catch(async (e) => {
    console.error('seeder failed', e);
    process.exit(1);
  });
