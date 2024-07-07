import express from 'express';
import multer from 'multer';
import path from 'path';

import UserController from '@/controllers/user.js';
import UserValidations from '@/validations/user-validations.js';
import checkAuth from '../middleware/check-auth.js';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, 'avatar-' + req.authedUser._id + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3000000 },
}).single('avatar');

const router = express.Router();

router.post('/sign-up', UserValidations.signUp, UserController.signUp);
router.post('/sign-in', UserValidations.signIn, UserController.signIn);
router.post('/ping', checkAuth, UserController.ping);
router.post('/refresh-token', checkAuth, UserController.refreshToken);
router.get('/me', checkAuth, UserController.getAuthedUser);
router.post('/me', checkAuth, upload, UserValidations.updateDetails, UserController.updateAuthedUser);

export default router;
