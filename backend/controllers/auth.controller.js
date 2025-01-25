import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import { redis } from "../lib/redis.js";

const generateToken=(userId)=>{
    const accessToken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    })

    const refreshToken=jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d"
    })

    return {accessToken,refreshToken};
}

const storeRefreshToken= async (userId,refreshToken)=>{
    await redis.set(`refresh_token:${userId}`,refreshToken,"Ex",7*24*60*60);
}

const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true, //prevent XSS attacks
        secure:process.env.NODE_ENV==="production",
        samesite:"strict", //prevents CSRF attack
        maxAge:15*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true, //prevent XSS attacks
        secure:process.env.NODE_ENV==="production",
        samesite:"strict", //prevents CSRF attack
        maxAge:7*24*60*60*1000
    })
}

export const signup=async (req,res)=>{
   const {email,password,name}=req.body;
   const userExists= await User.findOne({email});

   try {
    if(userExists){
        return res.status(400).json({message:"User already Exists"});
       }
    
       const user= await User.create({name,email,password});
       
       //autehnticate User 
     
       const {accessToken,refreshToken}=generateToken(user._id);
       await storeRefreshToken(user._id,refreshToken);

       setCookies(res,accessToken,refreshToken);

       res.status(201).json({success:true,message:"user created Succesfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
       })
   } catch (error) {
    res.status(500).json({success:false,message:error.message})
   }
}

export const login=async (req,res)=>{
    zres.send('login route called')
}

export const logout=async (req,res)=>{
    console.log('logout route called')
}