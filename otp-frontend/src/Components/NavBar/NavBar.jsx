import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="bg-gray-300 h-14 flex justify-between items-center px-20">
      <h1 className="text-2xl fnt tracking-wider">Authentcation and otp</h1>
      <div className="space-x-4 flex items-center">
        <Link to='/signUp' className="text-lg cursor-pointer bg-black text-white px-5 py-0.5" >Register</Link>
        <Link to='/signIn' className="text-lg cursor-pointer font-mono" >Sign In</Link>
      </div>
    </div>
  )
}

export default NavBar