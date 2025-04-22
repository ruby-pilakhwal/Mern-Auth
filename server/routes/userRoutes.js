import express from 'express'
import userAuth from '../middleware/userAuth.js'
import {getUserDetails} from '../controllers/userController.js'
//create a router for the user routes
//express.Router() creates a separate, modular route handler.
//userRouter is now a mini router that can handle user-related routes (e.g., user details).
const userRouter=express.Router();

//get user details
//userAuth is a middleware that checks if the user is authenticated
//getUserDetails is a controller that returns the user details
//userRouter.get() is a route handler that handles GET requests to the /data endpoint
userRouter.get('/data',userAuth,getUserDetails);
export default userRouter;
