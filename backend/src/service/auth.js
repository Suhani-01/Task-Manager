import jwt from 'jsonwebtoken'
export const generateToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    );
}

export const getAndAuthUser=(token)=>{
   try{
     return jwt.verify(token,process.env.JWT_SECRET);
   } catch(err){
    throw new Error(err) ;
   }
}
 