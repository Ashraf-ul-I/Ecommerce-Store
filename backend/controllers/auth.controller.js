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
    let errorMessage = 'An error occurred';

    if (error.name === 'ValidationError') {
        // Extract the first validation error message
        errorMessage = Object.values(error.errors)[0].message;
    } else {
        errorMessage = error.message;
    }

    res.status(400).json({ success: false, message: errorMessage });
   }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the password matches
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate tokens
      const { accessToken, refreshToken } = generateToken(user._id);
  
      // Store the refresh token 
      await storeRefreshToken(user._id, refreshToken);
  
      // Set cookies with the tokens
      setCookies(res, accessToken, refreshToken);
  
      // Send a success response
      res.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

export const logout=async (req,res)=>{
    try {
        const refreshToken=req.cookies.refreshToken;

        if(refreshToken){
            const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({success:true,message:"Logged out SuccessFully"})
    } catch (error) {
        res.status(500).json({success:false,message:"Server message", error:error.message})
    }
}

//this will refresh the access token
//if the accesstoken is expired then for another accesstoken refreshToken will needed so thats why this things
export const refreshToken=async (req,res)=>{
   try {
    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message:"No refresh token provided"})
    }

    const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    const storedToken= await redis.get(`refresh_token:${decoded.userId}`);
    if(storedToken !== refreshToken){
        return res.status(401).json({message:"Invalid refresh token"});
    }

    const accessToken=jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    res.cookie("accessToken",accessToken,{
        httpOnly:true, //prevent XSS attacks
        secure:process.env.NODE_ENV==="production",
        samesite:"strict", //prevents CSRF attack
        maxAge:15*60*1000
    });
    res.json({message:"Token refreshed Succesfully"})
   } catch (error) {
    res.status(500).json({message:"Server error",error:error.message})
   }
}

export const getProfile=async(req,res)=>{
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

