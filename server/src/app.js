import express from "express";
import cors from "cors"
const app = express()
import otpRoute from "./routes/otp.route.js"
import userRoute from "./routes/user.route.js"
import passport from "passport";
import session from 'express-session'
import passportAuth from "./utils/passport.auth.js"
import flash from "connect-flash";

app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret : "secrett",
    resave : false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use(otpRoute)
app.use(userRoute)
passportAuth(passport);



export default app