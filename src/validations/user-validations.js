import joi from 'joi';
import { emailRegex } from '../utils/utils.js';
import validateRequest from '../middleware/validate-request.js';

const signUp = (req, res, next) => {
  const signUpValidations = joi.object({
    firstName: joi.string().trim().min(1).required(),
    lastName: joi.string().trim().min(1).required(),
    email: joi.string().regex(emailRegex).required(),
    password: joi.string().trim().min(8).required(),
  });
  validateRequest(req, next, signUpValidations);
};

const signIn = (req, res, next) => {
  const signUpValidations = joi.object({
    email: joi.string().regex(emailRegex).required(),
    password: joi.string().trim().min(8).required(),
  });
  validateRequest(req, next, signUpValidations);
};

const updateDetails = (req, res, next) => {
  const updateDetailsValidations = joi.object({
    avatar: joi.any(),
    firstName: joi.string().trim().min(1).required(),
    lastName: joi.string().trim().min(1).required(),
    email: joi.string().regex(emailRegex).required(),
    newPassword: joi.string().min(8),
    repeatNewPassword: joi.string().when('newPassword', { is: joi.exist(), then: joi.string().required().valid(joi.ref('newPassword')) }),
    currentPassword: joi.string().optional().when('newPassword', { is: joi.exist(), then: joi.string().required() }),
  });
  console.log(updateDetailsValidations.validate(req.body).error);
  validateRequest(req, next, updateDetailsValidations);
};

export default {
  signUp,
  signIn,
  updateDetails,
};
