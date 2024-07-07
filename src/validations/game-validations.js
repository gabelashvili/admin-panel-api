import joi from 'joi';
import validateRequest from '../middleware/validate-request.js';

const addGame = (req, res, next) => {
  const addGameValidations = joi.object({
    name: joi.string().trim().min(5).required(),
    image: joi.any(),
  });
  validateRequest(req, next, addGameValidations);
};

export default {
  addGame,
};
