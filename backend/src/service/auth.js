import jwt from 'jsonwebtoken'

// Generate JWT token for user
export const generateToken=(user)=>{
    return jwt.sign(
        {id:user._id,email:user.email}, // payload → data stored inside token
        process.env.JWT_SECRET, // secret key to sign token
        {expiresIn:process.env.JWT_EXPIRE} // token expiry time
    );
}

// Verify token & extract user data
export const getAndAuthUser=(token)=>{
   try{
     return jwt.verify(token,process.env.JWT_SECRET); // decode + validate token
   } catch(err){
    throw new Error(err); // throw error if token invalid/expired
   }
}