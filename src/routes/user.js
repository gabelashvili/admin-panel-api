import express from 'express';

import UserController from '@/controllers/user.js';
import UserValidations from '@/validations/user-validations.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.post('/sign-up', UserValidations.signUp, UserController.signUp);
router.post('/sign-in', UserValidations.signIn, UserController.signIn);
router.post('/ping', checkAuth, UserController.ping);
router.post('/refresh-token', checkAuth, UserController.refreshToken);
router.get('/me', checkAuth, UserController.getAuthedUser);

export default router;
