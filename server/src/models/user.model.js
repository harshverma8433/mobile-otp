import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    phoneNumber : {
        type:String,
        required : true
    },
    otp : {
        type : Schema.Types.ObjectId,  
        ref : "Otp",

    }
})

userSchema.methods.isValidPassword = async function(password){
    try{
        console.log("comapre");
        return bcrypt.compare(password , this.password);
    }catch(error){
        console.log(error);
    }
};

const User = mongoose.model("User" , userSchema);

export default User;