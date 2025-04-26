import express from "express";
import cors from "cors"; //middleware to enable cross-origin resource sharing
import 'dotenv/config';  //load environment variables from .env file
import cookieParser from "cookie-parser"; //middleware to parse cookies from the request
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 5000; //port to listen on
connectDB();                  //connect to the database
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json()); //parse json bodies in the request
app.use(cookieParser()); //parse cookies from the request
app.use(cors({     //enable cors for all origins
    origin: allowedOrigins, //allow requests from this origin
    credentials: true, //allow cookies to be sent with requests
}));

//Api Endpoints
app.get('/', (req, res) => {
    res.send('Hello World');
});

//sets up a middleware for handling requests that start with the path /api/auth
//app.use() allows you to mount middleware functions at a specific path
//authRoutes is a router that contains all the routes for the authentication endpoints
app.use('/api/auth', authRoutes); //use the authRoutes for all requests to the /api/auth endpoint
//any request that starts with the path /api/auth will be handled by the authRoutes middleware.

app.use('/api/user', userRoutes);
    




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



