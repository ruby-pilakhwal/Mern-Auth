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
      const {data}= await axios.post(backendUrl+'/api/auth/send-reset-otp', {email});
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

  const onSubmitOtp= async (e)=>{
    e.preventDefault();
    const otpArray=inputRefs.current.map(e=>e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true);
   
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data}= await axios.post(backendUrl+'/api/auth/reset-password', {email,otp, newPassword});
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
    <div className="flex  items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <img
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      {/* enter email id */}
      {!isEmailSend && (
        <form onSubmit={onSubmitEmail}
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent outline-none text-whites"
              placeholder="Email id"
            />
          </div>
          <button
            type="submit"
            className="w-full  py-2.5 mt-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white"
          >
            Submit
          </button>
        </form>
      )}

      {/* otp input */}
      {!isOtpSubmitted && isEmailSend && (
        <form onSubmit={onSubmitOtp} className="bg-slate-900 p-10 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Reset Password OTP
          </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6 digit OTP sent to your email
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {/* The below code is creating an array of 6 numbers, and then for each number in the array, 
          it is creating an input field with the type of number. The result is 6 input fields, that 
          allows the user to input the 6 digit OTP sent to their email. */}
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12  text-center text-xl  rounded-full bg-[#333A5C] text-white"
                ref={(e) => (inputRefs.current[index] = e)} //ref is used to access the input element
                onInput={(e) => {
                  handleInput(e, index);
                }}
                onKeyDown={(e) => {
                  handleKeydown(e, index);
                }}
              />
            ))}
          {/* <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' />
          <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' />
          <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' />
          <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' />
          <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' />
          <input type="number" className='w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white' /> */}
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white"
        >
          Submit
        </button>
      </form>
      )}


      {/* enterPassword */}
      {isOtpSubmitted && isEmailSend && (
      <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-10 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the new password
        </p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white">
          <img src={assets.lock_icon} alt="" className="w-3 h-3" />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="bg-transparent outline-none text-whites"
            placeholder="New Password"
          />
        </div>
        <button
          type="submit"
          className="w-full  py-2.5 mt-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white"
        >
          Submit
        </button>
      </form>
      )}
    </div>
  );
};

export default ResetPassword;
