import jwt from 'jsonwebtoken';

//*user authentication middleware
const userAuth = async (req, res, next) => {
    // Allow is-auth endpoint to check auth status without token
    if (req.path === '/api/auth/is-auth') {
        return next();
    }

    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized',
                error: 'No token provided'
            });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized',
                error: 'Invalid token'
            });
        }
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized',
            error: 'Token verification failed'
        });
    }
};

export default userAuth;
