import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import React, { useState } from 'react'
import PageTitle from './PageTitle';

export const Register = () => {

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
      name: '',
      empID: '',
      mobile: '',
      email: '',
      password: '',
      role: ''
  })

  const createUser = () => {
      if(newUser.name === '' || newUser.empID === '' || newUser.mobile === '' || newUser.email === '' || newUser.password === '' || newUser.role === '') {
          alert('Please fill all the required fields')
          return
      }
      if(newUser.password.length < 8) {
          alert('Password must be atleast 8 characters')
          return
      }

      axios
        .post('https://admissions-3x9g.onrender.com/auth/register', newUser)
        .then(()=>{
            alert('User added successfully!') 
            navigate('/') 
        })
        .catch((error)=>{ console.error(`Server Error: ${error.message}`) })
  }

  return (
    <>
    <PageTitle message="Create New User"></PageTitle>
    <div className='w-full md:w-auto md:mx-9 p-6 bg-green-50 rounded-md md:shadow-md'>
             
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Employee Name</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=> setNewUser({...newUser, name: e.target.value})} value={newUser.name} name="name" id="name" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="userID" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Employee ID</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=> setNewUser({...newUser, empID: e.target.value})} value={newUser.empID} name="empID" id="empID" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="mobileNumber" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Mobile Number (10 Digits only)</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewUser({...newUser, mobile: e.target.value})} value={newUser.mobile} name="mobile" id="mobile" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="emailID" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Email Address</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=> setNewUser({...newUser, email: e.target.value})} value={newUser.email} name="emailID" id="emailID" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="forPassword" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Password</label>
                <div className="mt-2">
                    <input type="password" onChange={(e)=> setNewUser({...newUser, password: e.target.value})} value={newUser.password} name="password" id="password" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="forRole" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Role</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=> setNewUser({...newUser, role: e.target.value})} value={newUser.role} name="role" id="role" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
        </div>
    </div>
    <div className="mt-6 mb-6 flex items-center justify-center gap-x-6">
      <button onClick={()=>navigate('/')} type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">Cancel</button>
        <button onClick={()=>createUser()} type="submit" className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 cursor-pointer">Register <i className="fa-solid fa-user-plus"></i></button>
    </div>
    </>
  )
}
