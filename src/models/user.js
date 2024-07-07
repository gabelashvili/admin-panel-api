import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { emailRegex } from '../utils/utils.js';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      min: 1,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      min: 1,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: emailRegex,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(new Error('unknown'));
  }
});

UserSchema.methods.generateTokens = function generateTokens() {
  const accessToken = jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
  });
  const refreshToken = jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
  });
  return { accessToken, refreshToken };
};

UserSchema.methods.validatePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
