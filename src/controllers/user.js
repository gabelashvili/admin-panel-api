import expressAsyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import { UnauthorizedError } from '../middleware/check-auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// @desc    Sign up user
// @route   POST /api/users/sign-up
// @access  Public
const signUp = expressAsyncHandler(async (req, res, next) => {
  await UserModel.create(req.body);
  return res.status(200).json({ message: 'OK', data: null });
});

// @desc    Sign in user
// @route   POST /api/users/sign-in
// @access  Public
const signIn = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email }).select('+password');
  if (!user) {
    throw new Error('notFound');
  }

  const isPasswordValid = await user.validatePassword(req.body.password);
  if (!isPasswordValid) {
    throw new Error('notFound');
  }

  const tokens = user.generateTokens();
  return res.status(200).json({ data: { user, tokens }, message: 'OK' });
});

// @desc    Get authed user
// @route   GET /api/users/me
// @access  Private
const getAuthedUser = expressAsyncHandler(async (req, res, next) => {
  const user = req.authedUser;
  if (!user) {
    throw new Error('notFound');
  }

  return res.status(200).json({ data: { user }, message: 'OK' });
});

// @desc    Update authed user details
// @route   POST /api/users/me
// @access  Private
const updateAuthedUser = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.authedUser._id).select('password');

  if (req.body.newPassword) {
    const isValid = await user.validatePassword(req.body.currentPassword);
    if (!isValid) {
      throw new Error('validationError');
    }
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    req.body.password = hashedPassword;
    delete req.body.newPassword;
    delete req.body.repeatNewPassword;
    delete req.body.currentPassword;
  }

  await UserModel.findByIdAndUpdate(
    req.authedUser._id,
    {
      ...req.body,
      ...(req.file && { avatar: req.file.filename }),
    },
    { runValidators: true },
  );
  return res.status(200).json({ data: null, message: 'OK' });
});

// @desc    Refresh user token
// @route   POST /api/users/refresh-token
// @access  Private
const refreshToken = expressAsyncHandler(async (req, res, next) => {
  const token = req?.headers?.authorization?.split('Bearer')?.[1]?.trim();
  if (!token) {
    return next(new UnauthorizedError());
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const { userId } = decoded;
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new UnauthorizedError());
    }
    const { accessToken } = user.generateTokens();
    return res.status(200).json({ data: { accessToken }, message: 'OK' });
  } catch (err) {
    return next(new UnauthorizedError());
  }
});

// @desc    Ping user
// @route   POST /api/users/ping
// @access  Public
const ping = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json({ data: null, message: 'OK' });
});

export default {
  signUp,
  signIn,
  refreshToken,
  ping,
  getAuthedUser,
  updateAuthedUser,
};
