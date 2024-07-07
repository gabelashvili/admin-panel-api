import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import PlayerModel from '../models/player.js';
import mongoose from 'mongoose';

dotenv.config();

export function createRandomUser() {
  return {
    userName: faker.internet.userName(),
    totalBet: faker.number.int({ min: 0, max: 2554899 }),
    totalWin: faker.number.int({ min: 0, max: 1554899 }),
    level: faker.number.int({ min: 1, max: 5 }),
  };
}

export const players = faker.helpers.multiple(createRandomUser, {
  count: 80,
});

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(async () => {
    await PlayerModel.insertMany(players);
    console.log('Seeder succeed...');
    process.exit(1);
  })
  .catch(async (e) => {
    console.error('seeder failed', e.message);
    process.exit(1);
  });
