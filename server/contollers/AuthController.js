import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

//*register a new user
export const register = async (req, res) => { //register a new user
    const { name, email, password } = req.body; //get the data from the request body
    if(!name || !email || !password){ //check if all fields are required
        return res.status(400).json({success: false, message: 'All fields are required'});
    }
    
    try{
        //check if the user already exists
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hash the password

        //create a new user
        const user =new UserModel({ name, email, password: hashedPassword }); //create a new user with the hashed password
        await user.save();//save the user to the database

        //generate a token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //sign the token with the user's id and the secret key

        //send the token to the client
        res.cookie('token', token,{ //create a cookie with the token
            httpOnly: true, //prevent client side js from accessing the cookie , The cookie cannot be accessed by JavaScript (document.cookie)
            secure: process.env.NODE_ENV === 'production', //only send the cookie over https in production
           
            //sameSite: 'none' //Allows cookies to be sent in cross-site requests (needed for frontend-backend on different domains)
            //sameSite: 'strict' //prevents the cookie from being sent to other sites in development
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
            
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
            
        });

          //send a welcome email to the user
        //create a mail options object
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to:email,
            subject: 'Welcome to our app',
            text: `Welcome ${user.name} . Your account has been created successfully`
        }
        //send the email
        await transporter.sendMail(mailOptions);

        //send the user data to the client
        res.status(201).json({success: true, message: 'User registered successfully'});
    }catch(error){           
        res.status(500).json({success: false, message: error.message});
    }
}


//* login a user
export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: 'All fields are required'});
    }
    
    //check if the user exists
    try{
        const user = await UserModel.findOne({email}); //find the user by email
        

        if(!user){ //if the user does not exist, return an error
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        //compare the password
        const isMatch = await bcrypt.compare(password, user.password); //compare the password with the hashed password
        if(!isMatch){ //if the password is incorrect, return an error
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        //create a token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //sign the token with the user's id and the secret key
        
        //send the token to the client
        res.cookie('token', token,{ //create a cookie with the token
            httpOnly: true, //prevent client side js from accessing the cookie , The cookie cannot be accessed by JavaScript (document.cookie)
            secure: process.env.NODE_ENV === 'production', //only send the cookie over https in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });


      

        //send the user data to the client (user has logged in)
        return res.status(200).json({success: true, message: 'User logged in successfully', user: {name: user.name, email: user.email, _id: user._id}}); 

        
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}


//*logout a user
export const logout = async (req, res) => {
     try{
        //clear the cookie
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }); 
        return res.status(200).json({success: true, message: 'User logged out successfully'});
     }catch(error){
        res.status(500).json({success: false, message: error.message});
     }
}


//*send a verify otp email to the user
export const sendVerifyOtp = async (req, res) => {
   try{
    const {userId} = req.body;
    const user = await UserModel.findById(userId);
    
    //check if the user is already verified
    if(user.isAccountVerified){
        return res.json({success:false, message: 'User already verified'});
    }

    //generate a 6 digit otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //save the otp to the user
    user.verifyOtp = otp; 
    user.verifyOtpExpiry = Date.now() + 10 * 60 * 1000; //10 minutes
    await user.save(); //save the user to the database
    
    //create a mail options object
    //send the otp to the user's email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Verify your email',
        text: `Your OTP is ${otp}`
    }
    //send the otp to the user's email
    await transporter.sendMail(mailOptions);


    return res.json({success:true, message: 'Verify OTP sent to the user\'s email'});

   }catch(error){
    res.status(500).json({success: false, message: error.message});
   }
}


//*verify the email
export const verifyEmail = async (req, res) => {
   
        const {userId, otp} = req.body;
        //check if the user and otp are provided
        if(!userId || !otp){
            return res.json({success:false, message: 'missing fields'});
        }
        try{
            const user = await UserModel.findById(userId);
            //check if the user exists
            if(!user){
                return res.json({success:false, message: 'User not found'});
            }
            //check if the otp is correct
            //check if the otp is empty or not correct
            if(user.verifyOtp === '' || user.verifyOtp !== otp){
                return res.json({success:false, message: 'Invalid OTP'});
            }

            if(user.verifyOtpExpiry < Date.now()){
                return res.json({success:false, message: 'OTP expired'});
            }
            
            //update the user's account to be verified
            user.isAccountVerified = true;
            user.verifyOtp = ''; //clear the otp
            user.verifyOtpExpiry = 0; //clear the expiry
            await user.save(); //save the user to the database

            return res.json({success:true, message: 'Email verified successfully'});
            

        }catch(error){
            res.status(500).json({success: false, message: error.message});
        }
}


//*check if the user is authenticateds
export const isAuthenticated = async (req, res) => {
   try{
   
     res.json({success:true, message: 'User is authenticated'});
   }catch(error){
    res.status(500).json({success: false, message: error.message});
   }
}

//*Send Password Reset otp
//send a reset otp to the user's email
export const sendResetOtp = async (req, res) => {
    const {email} = req.body; //get the email from the request body
    if(!email){
        return res.json({success:false, message: 'Email is required'});
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false, message: 'User not found'});
        }
        //generate a 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp; 
        user.resetOtpExpiry = Date.now() + 15 * 60 * 1000; //1 minutes
        await user.save(); //save the user to the database
          
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset your password',
            text: `Your OTP for resetting your password is ${otp}`
        }
        //send the otp to the user's email
        await transporter.sendMail(mailOptions);
        res.json({success:true, message: 'Reset OTP sent to the user\'s email'});
        
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

//*reset user passwords
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false, message: 'missing fields'});
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false, message: 'User not found'});
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){ 
            return res.json({success:false, message: 'Invalid OTP'});
        }

        if(user.resetOtpExpiry < Date.now()){
            return res.json({success:false, message: 'OTP expired'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); //hash the new password


        //update the user's password
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiry = 0;
        await user.save(); //save the user to the database

        res.json({success:true, message: 'Password reset successfully'});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
    
}
