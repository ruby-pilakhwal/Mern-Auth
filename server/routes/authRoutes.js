import express from 'express';
import { register, login, logout } from '../contollers/AuthController.js';

//express.Router() creates a separate, modular route handler.
//authRouter is now a mini router that can handle authentication-related routes (e.g., login, signup, logout).
const authRouter = express.Router(); //create a router for the auth routes


authRouter.post('/register', register); //register a new user
authRouter.post('/login', login); //login a user
authRouter.post('/logout', logout); //logout a user






export default authRouter;