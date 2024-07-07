import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export class UnauthorizedError extends Error {
  constructor(message = 'unauthorized') {
    super(message);
    this.name = message;
  }
}

const checkAuth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split('Bearer')[1]?.trim();
  const jwtKey = req.url === '/refresh-token' ? process.env.REFRESH_TOKEN_KEY : process.env.ACCESS_TOKEN_KEY;
  if (!token) {
    return next(new UnauthorizedError());
  }
  try {
    jwt.verify(token.trim(), jwtKey);
    const decoded = jwt.decode(token);
    if (decoded?.userId) {
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return next(new UnauthorizedError());
      }
      req.authedUser = user;
    }
    return next();
  } catch (err) {
    if (req.url === '/refresh-token') {
      console.log(err, token, jwtKey);
    }
    return next(new UnauthorizedError());
  }
};

export default checkAuth;
