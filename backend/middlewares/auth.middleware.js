
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protectRoute=async (req,res,next)=>{
    try {
        const accessToken=req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized - No access token provided"});

           
        }
        try {
            const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
            const user=await User.findById(decoded.userId).select("-password");
            if(!user){
                return res.status(401).json({message:"User not found"});
            }
    
            req.user=user;
            next()
        } catch (error) {
            if(error.name==="TokenExpiredError"){
                return rs.status(401).json({message:"Unauthoried Acccess Token expired"})
            }
            throw error;
        }
    } catch (error) {
        return res.status(401).json({message:"Unauthorized- Invalid Access Token"})
    }
}


export const adminRoute=(req,res,next)=>{
    //because we already return req.user from the protectROute so we can directly get the value from the req.user
    //not need to check or decoded the cookies again for the user
    //because if the route is protected then the next() will refer to the adminRoute
    //after that we check the adminRoute and then if user is admin it will go to next function means getProducts
    if(req.user && req.user.role ==="admin"){
        next();
    }else{
        return res.status(403).json({message:"Access Denied - Admin Only"})
    }
}