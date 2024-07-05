    import passport from "passport"
    import LocalStrategogy from "passport-local"
    import User from "../models/user.model.js"

    passport.use(
        new LocalStrategogy({
            usernameField : "email",
            passwordField : "password"
        }, async (email , password , done) => {
            try{
                const user  = await User.findOne({email})
                if(!user){
                    return done(null,false,{message : "User Not Registered!!!"})
                }
                
                const isMatch = await user.isValidPassword(password);
                console.log(isMatch);
                if(!isMatch){
                    return done(null,false,{message : "Password Didn't Match!!!"})
                    
                }
                
                return done(null , true, user)



            }catch(error){
                done(error)
            }
        }

    )
    )



    passport.serializeUser(function (user , done){
        done(null ,  user.id)
    })

    passport.deserializeUser(function (id , done){
        User.findById(id , function(error , user){
            done(error , user)
        })
    })

    export default (passport) => {};