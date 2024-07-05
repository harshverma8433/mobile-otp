import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import {useRecoilState} from "recoil";
import SignInState from "../../State/atoms/SignInState.js"
import axios from "axios";
import toast , {Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const SignIn = () => {

  const navigate = useNavigate();
  const [payload , setPayload] = useRecoilState(SignInState);

  const handlePayload = (event) => {
    setPayload((prevPayload) => (
      {
        ...prevPayload,
        [event.target.name]:event.target.value
      }
    ))
  }


  console.log(payload);

  const submitSignIn = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:4444/signIn' , payload);

    if(response.status === 203){
      toast.error(response.data.message)
    }else if(response.status === 200){
      toast(response.data.message)
      navigate("/");
    }
    
  }

  const [passwordVisible , setpasswordVisible] = useState(false);
  return (
    <form onSubmit={submitSignIn} className="flex flex-col space-y-5 pt-12">
      <Toaster/>
        <div className="flex flex-col ">
            <label className="text-xl tracking-wider font-serif  text-gray-600" htmlFor="email">Email</label>
            <input onChange={handlePayload} value={payload.email} className="px-2 w-96 h-10 rounded-xl focus:outline-dotted focus:outline-gray-600 bg-slate-200" type="email" name='email' id='email' />
        </div>
        <div className="flex flex-col">
            <label className="text-xl tracking-wider font-serif  text-gray-600" htmlFor="password">Password</label>
            <div className="relative right-0 flex ">
              <input onChange={handlePayload} value={payload.password} className=" px-2 w-96 h-10 rounded-xl focus:outline-dotted focus:outline-gray-600 bg-slate-200" type={passwordVisible ? "text" : "password"} id="password" name="password" />
              <div className="absolute right-4 top-3 cursor-pointer" onClick={() => setpasswordVisible(!passwordVisible)}>
                {
                  passwordVisible ? <IoMdEye /> : <IoMdEyeOff />
                }
              </div>
            </div>
        </div>
        <button className="bg-slate-800 text-white px-6 py-2 rounded-xl ">Sign In</button>
        <h1 className="text-gray-500 font-semibold text-center">Don&apos;t Have an Account ? <Link to='/signUp' className="text-slate-900">Sign Up</Link></h1>
    </form>
  )
}

export default SignIn