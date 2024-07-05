import mongoose from "mongoose"
const otpSchema = new mongoose.Schema({
    phoneNumber : {
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    otpExpiration:{
        type:Date,
        default : Date.now,
    }
})

export default mongoose.model("Otp" , otpSchema)