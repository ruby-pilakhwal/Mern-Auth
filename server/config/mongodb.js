import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('open', () => { //event listener for when the connection is open
        console.log('MongoDB connected');
    });
    
        await mongoose.connect(`${process.env.MONGODB_URI}/myDatabases`); //connect to the database 
}

export default connectDB;
