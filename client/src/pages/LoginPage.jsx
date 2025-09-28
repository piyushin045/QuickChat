import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign Up")

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*---------- left----------- */}
      <img src={assets.logo_big} alt='' className='w-[min(30vw,250px)]' />
      {/*-----------right-------- */}

      <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex
      flex-col gap-6 rounded-lg shadow-lg'>
          <h2>{currState}</h2>
          <input type='text' placeholder='Full Name' />
          <input type='text' placeholder='Email Address' />
          <input type='text' placeholder='Password' />

          <button className='bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none 
      text-sm font-light rounded-full cursor-pointer'>
        Create Account
      </button>
      <input type='checkbox' placeholder='i have read all the document carefully' />
      </form>
    </div>
  )
}

export default LoginPage