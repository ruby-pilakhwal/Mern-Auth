import UserModel from '../models/userModel.js';

//*get user details
export const getUserDetails = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await UserModel.findById(userId);

        if(!user){
            return res.json({success:false, message: 'User not found'});
        }

        const userData = {
           
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            
        }

        res.json({success:true, user: userData});
    }catch(error){
        res.json({success:false, message: error.message});
    }
}