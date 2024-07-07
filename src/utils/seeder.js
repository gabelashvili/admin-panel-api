import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import PlayerModel from '../models/player.js';
import mongoose from 'mongoose';
import TransactionModel from '../models/transaction.js';

dotenv.config();

export function createRandomUser() {
  return {
    userName: faker.internet.userName(),
    totalBet: 0,
    totalWin: 0,
    level: faker.number.int({ min: 1, max: 5 }),
    lastVisitDate: faker.date.past(),
  };
}

export function createRandomTransaction(playerId) {
  return {
    type: faker.helpers.arrayElement(['income', 'outcome']),
    status: faker.helpers.arrayElement(['fulfilled', 'pending']),
    amount: faker.number.int({ min: 1, max: 2326598 }),
    playerId,
    transactionDate: faker.date.past(),
  };
}

export const players = faker.helpers.multiple(createRandomUser, {
  count: 80,
});

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(async () => {
    const data = await PlayerModel.insertMany(players);
    const transactions = data.map((el) => createRandomTransaction(el._id));
    await TransactionModel.insertMany(transactions);
    console.log('Seeder succeed...');
    process.exit(1);
  })
  .catch(async (e) => {
    console.error('seeder failed', e);
    process.exit(1);
  });
