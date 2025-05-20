import React from 'react'

const PageTitle = ({message}) => {
  return (
    <div className='w-full flex justify-center py-2'>
      <h1 className='text-xl sm:text-2xl md:text-3xl text-green-800 font-semibold'>{message}</h1>
    </div>
  )
}

export default PageTitle
