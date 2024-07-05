import {atom} from "recoil"

export const SignUpState = atom({
    key:"SignUpState",
    default : {
        name:"",
        email:"",
        phoneNumber : "",
        password : ""
    }
})