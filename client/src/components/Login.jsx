import React, { useState } from 'react'
import PageTitle from './PageTitle'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5555/auth/login', credentials);
    localStorage.setItem('token', res.data.token);
    console.log(res.data.token)
    navigate('/view-all');
  };


  return (
    <>
        <PageTitle message="User Login"></PageTitle>

        <div className="w-full flex justify-center items-center">
          <div className="w-100 bg-green-50 md:rounded-md md:shadow-md p-10">
             <div>
              <label htmlFor="forEmail" className="block text-sm/6 font-medium text-gray-900">Email ID</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=>setCredentials({...credentials, email: e.target.value})} value={credentials.email} name="email" id="email" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
             </div>
             <div className='mt-5'>
              <label htmlFor="forPassword" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="mt-2">
                    <input type="password" onChange={(e)=>setCredentials({...credentials, password: e.target.value})} value={credentials.password} name="password" id="password" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
             </div>
             <div className='mt-5'>
                <div className="mt-2 text-center">
                    <button onClick={()=>handleSubmit()} className='bg-green-800 hover:bg-green-600 hover:shadow text-green-50 px-6 py-2 rounded-md cursor-pointer'>LogIn</button>
                </div>
             </div>
          </div>
        </div>
    </>
  )
}
