import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="Header" className='w-36 h-36 rounded-full mb-6'/>
     
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey, {userData?.name || 'Guest'} <img src={assets.hand_wave} alt="Hand Wave" className='w-8 aspect-square sm:w-8 md:w-10 lg:w-12'/>
       </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>WE ARE HERE TO HELP YOU</h2>
      <p className='max-w-md mb-8'>let's start with a quick product tour and we will have you up and running in no time</p>
      <button className='flex items-center gap-2 border border-gray-500 rounded-full px-8 py-2.5 cursor-pointer text-gray-800 hover:bg-gray-100 transition-all'>
        Get Started <img src={assets.arrow_icon} alt="Arrow" className='w-4 sm:w-5 md:w-6 lg:w-8'/>
      </button>
    </div>
  )
}

export default Header