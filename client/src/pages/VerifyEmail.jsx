import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useContext } from 'react'
import { AppContent } from '../context/AppContext'


const VerifyEmail = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedin,userData,getUserDetails} = useContext(AppContent);
  const navigate = useNavigate()
  // const [otp, setOtp] = useState('');
  const inputRefs= React.useRef([]);

  const handleInput=(e,index)=>{
    const currentInput=e.target.value;
    if(currentInput.length>0 && index<inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
    
  }
  const handleKeydown=(e,index)=>{
    if(e.key === 'Backspace' && e.target.value.length===0&& index>0){
      inputRefs.current[index-1].focus();
    }
  }
  
  const handlePaste = (e) => {
    e.preventDefault();
    const paste= e.clipboardData.getData('text');

    const pastArray = paste.split('');
    pastArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value); //convert array of input elements to array of values
      const otp = otpArray.join('');

      const {data}=await axios.post(backendUrl + '/api/auth/verify-account', { otp }, { withCredentials: true })
      if(data.success){
        toast.success(data.message);
        getUserDetails();
        navigate('/');
      }else{
        toast.error(data.message);
      }
 
    } catch (error) {
      toast.error(error.message);
    }
     
   };
  

  useEffect(()=>{
   isLoggedin && userData && userData.isAccountVerified && navigate('/');

  },[isLoggedin,userData])
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200'>
      <img onClick={() => navigate('/')} className='absolute top-5 left-5 sm:left-20 w-16 sm:w-20 md:w-24 lg:w-28 rounded-lg cursor-pointer' 
        src={assets.logoImg} alt="Logo" />
      <form onSubmit={handleSubmit}
        className='bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-sm'>
        <h1 className='text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-600/80'>Enter the 6 digit OTP sent to your email</p>
        <div className='flex justify-between mb-8 gap-2' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input type="text" maxLength="1" key={index} required
              className='w-12 h-12 text-center text-xl rounded-full bg-white/60 border-2 border-indigo-200 shadow-inner focus:ring-2 focus:ring-pink-300 text-indigo-900 outline-none transition-all duration-200 hover:scale-105' 
              ref={e=>inputRefs.current[index]=e}
              onInput={e=>handleInput(e,index)} 
              onKeyDown={e=>handleKeydown(e,index)}
            />
          ))}
        </div>
        <button type="submit" className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg'>Verify Email</button>
      </form>
    </div>
  )
}

export default VerifyEmail
