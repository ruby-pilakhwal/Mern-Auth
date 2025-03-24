import jwt from 'jsonwebtoken';

//*user authentication middleware
const userAuth = async (req, res, next) => {
    //get the token from the cookies
    const {token} = req.cookies;
    //check if the token is provided
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
           
        }else{
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        


    }catch(error){
        res.status(500).json({success: false, message: 'Internal server error'});
    }
    
}
