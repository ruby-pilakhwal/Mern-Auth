import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated , sendResetOtp, resetPassword, verifyResetOtp } from '../controllers/AuthController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

// Public routes (no auth required)
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/verify-reset-otp', verifyResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.get('/is-auth', isAuthenticated);

// Protected routes (require auth)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);

export default authRouter;