



// middleware to protect routes

import User from "../models/User";
import jwt from "jsonwebtoken"

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.headers.token;

        // to decode this token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if(!user) {
            return res.json({sucess: false, message:"user not found"})
        }
        
        res.user = user;
        next();
    } catch (error) {
        console.log(error.message)
        res.json({sucess:false, message: error.message})
    }
}

// controller to check if user is authenticated
export const checkAuth = ()=>{
    res.json({sucess: true, user: req.user});
}
