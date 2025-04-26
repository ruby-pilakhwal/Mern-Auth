import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerifyOtp= async ()=>{
    try {

      axios.defaults.withCredentials = true;
      const {data}= await axios.post(backendUrl + '/api/auth/send-verify-otp', { withCredentials: true });
      if(data.success){
        navigate('/verify-email');
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout', { withCredentials: true });
      if (data.success) {
        setIsLoggedin(false);
        setUserData({});
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 md:p-8 lg:p-10 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 md:w-40 lg:w-52"
      />
      {userData && userData.name ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          <span className="text-center">{userData.name[0].toUpperCase()}</span>
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-10 text-black p-2">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerifyOtp}
                 className="cursor-pointer hover:bg-gray-200 px-2 py-1">
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1 pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all"
        >
          LogIn
          <img
            src={assets.arrow_icon}
            alt="Arrow"
            className="w-4 sm:w-5 md:w-6 lg:w-8"
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;
