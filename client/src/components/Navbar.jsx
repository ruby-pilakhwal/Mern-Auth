import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    // useNavigate is a hook that allows us to navigate programmatically
    // We are using it here to navigate to the login page when the user clicks on the login button
    // The navigate function takes one argument which is the path to navigate to
    
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 md:p-8 lg:p-10 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 md:w-40 lg:w-52'/>
      <button onClick={() => navigate('/login')} className=' flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all'>
        LogIn <img src={assets.arrow_icon} alt="Arrow" className='w-4 sm:w-5 md:w-6 lg:w-8'/>
      </button>
    </div>
  )
}

export default Navbar