import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="flex flex-col items-center mt-28 px-4 text-center">
      <div className="w-36 h-36 rounded-full mb-6 bg-white/40 p-1 shadow-2xl">
        <img src={assets.header_img} alt="Header" className="w-full h-full object-cover rounded-full border-4 border-white/90 shadow-lg"/>
      </div>
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-extrabold mb-2 text-white drop-shadow-lg">
        Hey, {userData?.name || 'Guest'} <img src={assets.hand_wave} alt="Hand Wave" className="w-8 aspect-square sm:w-8 md:w-10 lg:w-12"/>
      </h1>
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
        WE ARE HERE TO HELP YOU
      </h2>
      <p className="max-w-md mb-8 text-purple-100 font-medium drop-shadow">
        Let's start with a quick product tour and we will have you up and running in no time
      </p>
      <button className="flex items-center gap-2 border-none rounded-full px-10 py-3 cursor-pointer text-purple-700 bg-white/90 shadow-lg hover:scale-105 hover:shadow-xl transition-all font-semibold text-lg">
        Get Started <img src={assets.arrow_icon} alt="Arrow" className="w-5 sm:w-6 md:w-7 lg:w-8"/>
      </button>
    </div>
  )
}

export default Header