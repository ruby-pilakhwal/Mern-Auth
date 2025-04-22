import express from 'express';

import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated , sendResetOtp, resetPassword } from '../controllers/AuthController.js';
import userAuth from '../middleware/userAuth.js';

//express.Router() creates a separate, modular route handler.
//authRouter is now a mini router that can handle authentication-related routes (e.g., login, signup, logout).
const authRouter = express.Router(); //create a router for the auth routes


authRouter.post('/register', register); //register a new user
authRouter.post('/login', login); //login a user
authRouter.post('/logout', logout); //logout a user
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp); //verify the otp
authRouter.post('/verify-account', userAuth,verifyEmail); //verify the email
authRouter.post('/is-auth', userAuth,isAuthenticated); //check if the user is authenticated
authRouter.post('/send-reset-otp', sendResetOtp); //send a reset otp to the user's email
authRouter.post('/reset-password', resetPassword); //reset the user's password


export default authRouter;