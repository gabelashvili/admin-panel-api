import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

import routes from '@/routes/index.js';
import connectDB from './utils/db.js';
import errorHandler from './middleware/error-handler.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT ?? 8000;

// Get avatar
app.get('/images/:imageId', (req, res, next) => {
  const { imageId } = req.params;
  console.log(imageId, 22);
  const readStream = fs.createReadStream(`./uploads/${imageId}`);
  readStream.on('error', () => next('notFound'));
  readStream.pipe(res);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api`, routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
