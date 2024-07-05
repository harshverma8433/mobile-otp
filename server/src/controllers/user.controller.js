import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const SignUp = async (req,res) => {
    
    const {name , email , phoneNumber , password} = req.body;
    
    const existingUser = await User.findOne({email});
    console.log("juduef");
    
    if(existingUser){
        return res.status(203).json({status : false,message : "User Already Registered !! "})
    }

    const hashedPassword = await bcrypt.hash(password ,10);
    
    const newUser = await User.create({
        name,
        email,
        phoneNumber,
        password:hashedPassword
    })

    if(!newUser){
        return res.status(203).json({status : false,message : "Something Went Wrong !!!"})
    }

    return res.status(200).json({
        status : true,
        message : "User Registered SuccessFully!!!"
    })





}

export default {SignUp};