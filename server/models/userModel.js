import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({ //schema for the user model
    name:{ 
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    verifyOtp:{
        type:String,
        default:'',
    },
    verifyOtpExpiry:{
        type:Number,
        default:0,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    },
    reserOtp:{
        type:String,
        default:'',
    },
    resetOtpExpiry:{
        type:Number,
        default:0,
    },
    
});


const UserModel = mongoose.models.User || mongoose.model('User', userSchema); //check if the model already exists, if not, create a new one

export default UserModel;

