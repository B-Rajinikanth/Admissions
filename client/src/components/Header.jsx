import React from 'react'
import SNULogo from '../assets/SNULogo.png'

const Header = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center py-5'>
        <img className='w-40 md:w-75' src= {SNULogo} alt="Sreenidhi University" />
    </div>
  )
}

export default Header
