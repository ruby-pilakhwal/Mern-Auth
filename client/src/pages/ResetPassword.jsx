import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const ResetPassword = () => {
  const {backendUrl}=useContext(AppContent);
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    const currentInput = e.target.value;
    if (currentInput.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeydown = (e, index) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");

    const pastArray = paste.split("");
    pastArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitEmail= async (e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post(backendUrl+'/api/auth/send-reset-otp', {email}, { withCredentials: true });
      if(data.success){
        toast.success(data.message);
        setIsEmailSend(true);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verify-reset-otp', { email, otp }, { withCredentials: true });
      if (data.success) {
        setIsOtpSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data}= await axios.post(backendUrl+'/api/auth/reset-password', {email,otp, newPassword}, { withCredentials: true });
      if(data.success){
        toast.success(data.message);
        navigate("/login");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200">
      <img
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 sm:left-20 w-16 sm:w-20 md:w-24 lg:w-28 rounded-lg cursor-pointer"
        src={assets.logoImg}
        alt="Logo"
      />
      {!isEmailSend && (
        <form onSubmit={onSubmitEmail}
          className="bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-sm">
          <h1 className="text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-600/80">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/60 border border-indigo-200 shadow-inner focus-within:ring-2 focus-within:ring-pink-300 text-indigo-900">
            <img src={assets.mail_icon} alt="" className="w-4 h-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent outline-none text-indigo-900 placeholder-indigo-400 font-medium flex-1"
              placeholder="Email id"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg"
          >
            Submit
          </button>
        </form>
      )}
      {isEmailSend && !isOtpSubmitted && (
        <form onSubmit={onSubmitOtp} className="bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-sm">
          <h1 className="text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-600/80">
            Enter the 6 digit OTP sent to your email
          </p>
          <div className="flex justify-between mb-8 gap-2" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 text-center text-xl rounded-full bg-white/60 border-2 border-indigo-200 shadow-inner focus:ring-2 focus:ring-pink-300 text-indigo-900 outline-none transition-all duration-200 hover:scale-105"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeydown(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg"
          >
            Submit
          </button>
        </form>
      )}
      {isOtpSubmitted && (
        <form onSubmit={onSubmitNewPassword} className="bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-sm">
          <h1 className="text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-600/80">
            Enter the new password
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/60 border border-indigo-200 shadow-inner focus-within:ring-2 focus-within:ring-pink-300 text-indigo-900">
            <img src={assets.lock_icon} alt="" className="w-4 h-4" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-transparent outline-none text-indigo-900 placeholder-indigo-400 font-medium flex-1"
              placeholder="New Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
