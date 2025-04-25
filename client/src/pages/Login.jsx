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
           const{data}= await axios.post(backendUrl+'/api/auth/register', {name, email, password});
              if(data.success){
                setIsLoggedin(true);
                getUserDetails();
                navigate('/');
              }else{
                toast.error(data.message);
              }
          }else{
            const{data}= await axios.post(backendUrl+'/api/auth/login', {email, password});
            if(data.success){
              setIsLoggedin(true);
              getUserDetails();
              navigate('/');
            }else{
              toast.error(data.message);
            }

          }
          
           
        } catch (error) {
          toast.error(error.message);
        }
    };
    return (  
    <div className='flex  items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 '>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute top-5 left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' /> 
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
         <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create account' : 'Log In'}</h2>
         <p className=' text-center mb-6 text-sm'>{state === 'Sign Up' ? 'Create your account' : 'Log In to your account'}</p>
     <form onSubmit={handleSubmit}>
        {
            state === 'Sign Up' && (
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt="" />
                    <input 
                    onChange={(e) => setName(e.target.value)} value={name}
                    className='bg-transparent outline-none' type="text" id="name" name="name" placeholder='Enter your name' required/>
                </div>
            )
        }
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            {/* <label htmlFor="email">Email</label> */}
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" id="email" name="email" placeholder='Enter your email' required />
        </div>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            {/* <label htmlFor="password">Password</label> */}
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='bg-transparent outline-none' type="password" id="password" name="password" placeholder='Enter your password' required />
        </div>
        <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer text-sm'>Forgot Password?</p>
        <button className='w-full bg-indigo-500 text-white py-2.5 rounded-full'>{state}</button>
     </form>
     {state === 'Sign Up' ? (
        <p className='text-xs text-gray-400 text-center mt-4'> Already have an account?{' '} <span onClick={() => setState('Log In')} className='text-blue-400 cursor-pointer underline'>Login here</span></p>
     ) : (
        <p className='text-xs text-gray-400 text-center mt-4'> Don't have an account?{' '} <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span></p>
     )}
      </div>
    </div>
  )
} 

export default Login
