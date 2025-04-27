import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${assets.bg_img})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-green-100/40 to-transparent pointer-events-none z-0" />
      <div className="relative z-10 w-full">
        <Navbar />
        <Header />
      </div>
    </div>
  )
}

export default Home
