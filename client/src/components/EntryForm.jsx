import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import React, { useState } from 'react'

const EntryForm = () => {

    const navigate = useNavigate();

    const [newApplicant, setNewApplicant] = useState({
        applicationNumber: 0,
        applicantName: "",
        mobileNumber: 0,
        interMarks: 0,
        eapcetRank: 0,
        sucetMarks: 0,
        feePayable: 0,
        remarks: ""
    })

    const [applicationNumber, setApplicationNumber] = useState()

    const handleSave = ()=> {
        if(newApplicant.applicantName === "" || newApplicant.mobileNumber === 0 || newApplicant.interMarks === 0 || newApplicant.eapcetRank === 0){
            alert('Please fill all the required fields')
            return
        }

        axios
            .post('http://localhost:5555/applicants', newApplicant)
            .then(()=>{
                alert('Applicant added successfully!') 
                navigate('/view-all') 
            })
            .catch((error)=>{ console.error(`Server Error: ${error.message}`) })
    }

  return (
    <>
    <div className="w-full flex justify-end px-20 py-5">
        <Link to={'/view-all'} className='bg-green-800 hover:bg-green-600 text-green-50 px-4 py-2 rounded-md hover:font-semibold'>View All <i className="fa-solid fa-eye"></i></Link>
    </div>
    <div className='w-full md:w-auto md:mx-9 p-6 bg-green-50 rounded-md md:shadow-md'>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="applicationNumber" className="block text-sm/6 font-medium text-gray-900">Application Number</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewApplicant({...newApplicant, applicationNumber: e.target.value})} name="applicationNumber" id="applicationNumber" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Applicant Full Name</label>
                <div className="mt-2">
                    <input type="text" onChange={(e)=> setNewApplicant({...newApplicant, applicantName: e.target.value})} name="fullName" id="fullName" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="mobileNumber" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Applicant Mobile Number (10 Digits only)</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewApplicant({...newApplicant, mobileNumber: e.target.value})} name="mobileNumber" id="mobileNumber" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="intermediateMarks" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Intermediate Marks</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewApplicant({...newApplicant, interMarks: e.target.value})} name="intermediateMarks" id="intermediateMarks" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="eapcetRank" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>EAPCET Rank</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewApplicant({...newApplicant, eapcetRank: e.target.value})} name="eapcetRank" id="eapcetRank" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="sucetMarks" className="block text-sm/6 font-medium text-gray-900">SUCET Marks</label>
                <div className="mt-2">
                    <input type="number" onChange={(e)=> setNewApplicant({...newApplicant, sucetMarks: e.target.value})} name="sucetMarks" id="sucetMarks" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
        </div>

        <div className="col-span-full mt-8">
          <label htmlFor="remarks" className="block text-sm/6 font-medium text-gray-900">Remarks</label>
          <div className="mt-2">
            <textarea name="remarks" onChange={(e)=> setNewApplicant({...newApplicant, remarks: e.target.value})} id="remarks" rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
          <p className="mt-3 text-sm/6 text-gray-600">Write any comment about applicant enquiry.</p>
        </div>
    </div>
    <div className="mt-6 mb-6 flex items-center justify-center gap-x-6">
        <button onClick={()=>navigate('/view-all')} type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">Cancel</button>
        <button onClick={()=>handleSave()} type="submit" className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 cursor-pointer">Save <i className="fa-solid fa-floppy-disk"></i></button>
    </div>
    </>
  )
}

export default EntryForm
