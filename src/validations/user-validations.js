import joi from 'joi';
import { emailRegex } from '../utils/utils.js';
import validateRequest from '../middleware/validate-request.js';

const signUp = (req, res, next) => {
  const signUpValidations = joi.object({
    firstName: joi.string().trim().min(1),
    lastName: joi.string().trim().min(1),
    email: joi.string().regex(emailRegex),
    password: joi.string().trim().min(8),
  });
  validateRequest(req, next, signUpValidations);
};

const signIn = (req, res, next) => {
  const signUpValidations = joi.object({
    email: joi.string().regex(emailRegex),
    password: joi.string().trim().min(8),
  });
  validateRequest(req, next, signUpValidations);
};

export default {
  signUp,
  signIn,
};
