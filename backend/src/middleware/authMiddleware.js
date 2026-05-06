import jwt from 'jsonwebtoken';
import { getAndAuthUser } from '../service/auth.js';

const protect=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"You need to login first"});
    }

    try{
        const decoded=getAndAuthUser(token)
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"});
    }
};
export default protect;