import { TryCatch } from "./error.js";
import ErrorHandler from "../utils/utility-class.js";
import { User } from "../models/user.js";
//middleware to make sure only admin is allowed
export const adminOnly= TryCatch(async (req,res,next)=>{
    const {id}=req.query;
    
    if(!id) return next(new ErrorHandler("Login First", 401))

    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("User id does not exist",401))

    if(user.role !== 'admin')
        return next(new ErrorHandler("You don not posses any specific admin privileges",401))

    next();
});

// "api/v1/user/asdfsadf?key=24"  //query