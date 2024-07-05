import PhoneNumber from "./Components/PhoneNumber/PhoneNumber.jsx";
import NavBar from "./Components/NavBar/NavBar";
import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn.jsx";
import SignUp from "./Components/Pages/SignUp.jsx";
const App = () => {
  return (
    <RecoilRoot>

      <div className="flex flex-col">
        <NavBar />
        <div className=" flex  justify-center pt-28 h-[686px]">
          <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/otp" element={<PhoneNumber />} />
          </Routes>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
