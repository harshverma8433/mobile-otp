import {atom} from "recoil"

const SignInState = atom({
    key:"SignInState",
    default : {
        email : "",
        password : ""
    }
})

export default SignInState