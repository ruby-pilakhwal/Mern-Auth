import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
// import ResetPassword from './ResetPassword'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
    const navigate = useNavigate()
    const {backendUrl,setIsLoggedin,getUserDetails}=useContext(AppContent);
    

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        try {
          e.preventDefault();

          axios.defaults.withCredentials = true;

          if(state === 'Sign Up'){
           const{data}= await axios.post(backendUrl + '/api/auth/register', {name, email, password}, { withCredentials: true });
              if(data.success){
                setIsLoggedin(true);
                getUserDetails();
                navigate('/');
              }else{
                toast.error(data.message);
              }
          }else{
            const response = await axios.post(backendUrl+'/api/auth/login', {email, password});
            if(response.data.success){
              setIsLoggedin(true);
              getUserDetails();
              navigate('/');
            }else{
              toast.error(response.data.message);
            }

          }
          
           
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred. Please try again.');
          }
        }
    };
    return (  
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200">
      <img onClick={() => navigate('/')} src={assets.logoImg} alt="Logo" className="absolute top-5 left-5 sm:left-20 w-16 sm:w-20 md:w-24 lg:w-28 rounded-lg cursor-pointer" /> 
      <div className="bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full sm:w-96 border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 text-indigo-900 text-sm">
         <h2 className="text-3xl font-extrabold text-center mb-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-x">{state === 'Sign Up' ? 'Create account' : 'Log In'}</h2>
         <p className="text-center mb-6 text-base text-indigo-600/80">{state === 'Sign Up' ? 'Create your account' : 'Log In to your account'}</p>
     <form onSubmit={handleSubmit}>
        {
            state === 'Sign Up' && (
                <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/60 border border-indigo-200 shadow-inner focus-within:ring-2 focus-within:ring-pink-300">
                    <img src={assets.person_icon} alt="" />
                    <input 
                    onChange={(e) => setName(e.target.value)} value={name}
                    className="bg-transparent outline-none text-indigo-900 placeholder-indigo-400 font-medium flex-1"
                    type="text" id="name" name="name" placeholder="Enter your name" required/>
                </div>
            )
        }
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/60 border border-indigo-200 shadow-inner focus-within:ring-2 focus-within:ring-pink-300">
            <img src={assets.mail_icon} alt="" />
            {/* <label htmlFor="email">Email</label> */}
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="bg-transparent outline-none text-indigo-900 placeholder-indigo-400 font-medium flex-1" type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/60 border border-indigo-200 shadow-inner focus-within:ring-2 focus-within:ring-pink-300">
            <img src={assets.lock_icon} alt="" />
            {/* <label htmlFor="password">Password</label> */}
            <input onChange={(e) => setPassword(e.target.value)} value={password} className="bg-transparent outline-none text-indigo-900 placeholder-indigo-400 font-medium flex-1" type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer text-sm hover:underline transition-all">Forgot Password?</p>
        <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg">{state}</button>
     </form>
     {state === 'Sign Up' ? (
        <p className="text-xs text-gray-500 text-center mt-4"> Already have an account?{' '} <span onClick={() => setState('Log In')} className="text-pink-500 cursor-pointer underline font-semibold">Login here</span></p>
     ) : (
        <p className="text-xs text-gray-500 text-center mt-4"> Don't have an account?{' '} <span onClick={() => setState('Sign Up')} className="text-indigo-500 cursor-pointer underline font-semibold">Sign Up</span></p>
     )}
      </div>
    </div>
  )
} 

export default Login
