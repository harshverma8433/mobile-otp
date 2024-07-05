import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SignUpState } from "../../State/atoms/SignUpState";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import "./SignUp.css"
import axios from 'axios'
import toast , {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {

    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [payload, setPayload] = useRecoilState(SignUpState);
    const [phoneNumber, setPhoneNumber] = useState('');

    console.log(payload);

    const handlePayload = (event) => {
        setPayload((prevPayload) => ({
            ...prevPayload,
            [event.target.name]: event.target.value
        }));
    };

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
        setPayload((prevPayload) => ({
            ...prevPayload,
            phoneNumber: value
        }));
    };
    const [passwordLength , setPasswordLength] = useState(false);
    console.log(passwordLength);

    const SubmitSignUpForm = async (event) => {
        event.preventDefault();


        if(payload.password.length < 6){
            setPasswordLength(true);
            return;
        }

        setPasswordLength(false);

        const response = await axios.post( 'http://localhost:4444/signUp' , payload);

        console.log(response);

        if(response.status === 203){
            toast.error(response.data.message);
        }
        
        else if(response.status === 200){
            
            toast.success(response.data.message);
            console.log(response.data.message);
            setTimeout(() => {
                navigate("/signIn");
            }, 2000)
        }



    }
 

    return (
        <form method="post" onSubmit={SubmitSignUpForm}>
            <Toaster/>
                <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                    <label className="text-xl tracking-wider font-serif text-gray-600" htmlFor="name">Name</label>
                    <input onChange={handlePayload} className="px-2 w-96 h-10 rounded-xl focus:outline-dotted focus:outline-gray-600 bg-slate-200" type="text" name="name" id="name" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl tracking-wider font-serif text-gray-600" htmlFor="email">Email</label>
                    <input onChange={handlePayload} className="px-2 w-96 h-10 rounded-xl focus:outline-dotted focus:outline-gray-600 bg-slate-200" type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl tracking-wider font-serif text-gray-600" htmlFor="phoneNumber">Mobile No.</label>
                    <PhoneInput
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        defaultCountry="IN"  
                        className="phone-input px-2 w-96 h-10 rounded-xl focus:outline-0 text-black focus:outline-dotted focus:outline-gray-600 bg-slate-200"
                        limitMaxLength='8'
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl tracking-wider font-serif text-gray-600" htmlFor="password">Password</label>
                    <div className="relative right-0 flex">
                        <input onChange={handlePayload} className="px-2 w-96 h-10 rounded-xl focus:outline-dotted focus:outline-gray-600 bg-slate-200" type={passwordVisible ? "text" : "password"} id="password" name="password" />
                        <div className="absolute right-4 top-3 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
                        </div>
                    </div>
                {
                passwordLength  && <h1 className="text-red-500 text-sm pl-1">Password Should Be AtLeast 6 Digit </h1>
                }
                </div>
                <button className="bg-slate-800 text-white px-6 py-2 rounded-xl">Sign Up</button>
                <h1 className="text-gray-500 font-semibold text-center">Already Have an Account? <Link to="/signIn" className="text-slate-900">Sign In</Link></h1>
            </div>
        </form>
    );
};

export default SignUp;
