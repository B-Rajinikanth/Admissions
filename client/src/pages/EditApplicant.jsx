import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

const EditApplicant = () => {

    const navigate = useNavigate();

    const [applicant, setApplicant] = useState({});

    const {id} = useParams()

    

    const handleSave = ()=> {
        const interMarks = Number(applicant.interMarks);
        const eapcetRank = Number(applicant.eapcetRank);
        const sucetMarks = Number(applicant.sucetMarks);

        let interWeight = 0, eapcetWeight = 0, sucetWeight = 0, meritScore = 0, fee = 0;

        // Calculate weightages
        if (interMarks >= 780) interWeight = 100;
        else if (interMarks >= 720) interWeight = 80;
        else if (interMarks >= 660) interWeight = 40;
        else if (interMarks >= 520) interWeight = 20;

        if (eapcetRank >= 1 && eapcetRank <= 8000) eapcetWeight = 100;
        else if (eapcetRank <= 25000) eapcetWeight = 80;
        else if (eapcetRank <= 50000) eapcetWeight = 60;
        else if (eapcetRank <= 90000) eapcetWeight = 40;
        else if (eapcetRank <= 120000) eapcetWeight = 20;

        if (sucetMarks > 26) sucetWeight = 100;
        else if (sucetMarks > 16) sucetWeight = 80;
        else if (sucetMarks > 6) sucetWeight = 40;

        // Calculate merit score
        meritScore = (interWeight / 100 * 10) + (eapcetWeight / 100 * 80) + (sucetWeight / 100 * 10);

        // Fee calculation
        if (interMarks < 500) fee = 450000;
        else if (meritScore >= 90) fee = 125000;
        else if (meritScore >= 75.2) fee = 150000;
        else if (meritScore >= 59.4) fee = 230000;
        else if (meritScore >= 43.64) fee = 290000;
        else if (meritScore >= 27.82) fee = 350000;
        else if (meritScore >= 13.0) fee = 400000;

        // Final object to update
        const updatedApplicant = {
            ...applicant,
            feePayable: fee,
        };

        // Update backend
        axios
            .put(`https://admissions-3x9g.onrender.com/applicants/${id}`, updatedApplicant)
            .then(() => {
                alert('Applicant updated successfully!');
                navigate('/view-all');
            })
            .catch((error) => {
                console.error(`Server Error: ${error.message}`);
            });
    }


   useEffect(()=>{
    axios
        .get(`https://admissions-3x9g.onrender.com/applicants/${id}`)
        .then((response) => {
            console.log('Fetched applicant:', response.data);
            setApplicant(response.data);
        })
        .catch((error) => {
            console.error('Error fetching applicant:', error);
        });
        
   }, [])

  return (
    <>
        <PageTitle message='Update Applicant Details' />
        <div className="w-full flex justify-center md:justify-end px-20 py-3">
            <Link to={'/view-all'} className='bg-green-800 hover:bg-green-600 text-green-50 px-4 py-2 rounded-md hover:font-semibold'>View All <i className="fa-solid fa-eye"></i></Link>
        </div>
        <div className='w-full md:w-auto md:mx-9 p-6 bg-green-50 rounded-md md:shadow-md'>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="applicationNumber" className="block text-sm/6 font-medium text-gray-900">Application Number</label>
                    <div className="mt-2">
                        <input type="number" onChange={(e)=> setApplicant({ ...applicant, applicationNumber: e.target.value })} value={applicant.applicationNumber || ''} name="applicationNumber" id="applicationNumber" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Applicant Full Name</label>
                    <div className="mt-2">
                        <input type="text" onChange={(e)=> setApplicant({ ...applicant, applicantName: e.target.value })} value={applicant.applicantName} name="fullName" id="fullName" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="mobileNumber" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Applicant Mobile Number (10 Digits only)</label>
                    <div className="mt-2">
                        <input type="number" onChange={(e)=> setApplicant({ ...applicant, mobileNumber: e.target.value})} value={applicant.mobileNumber} name="mobileNumber" id="mobileNumber" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="intermediateMarks" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Intermediate Marks</label>
                    <div className="mt-2">
                        <input type="number" onChange={(e)=> setApplicant({ ...applicant, interMarks: e.target.value})} value={applicant.interMarks} name="intermediateMarks" id="intermediateMarks" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="eapcetRank" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>EAPCET Rank</label>
                    <div className="mt-2">
                        <input type="number" onChange={(e)=> setApplicant({ ...applicant, eapcetRank: e.target.value})} value={applicant.eapcetRank} name="eapcetRank" id="eapcetRank" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="sucetMarks" className="block text-sm/6 font-medium text-gray-900">SUCET Marks</label>
                    <div className="mt-2">
                        <input type="number" onChange={(e)=> setApplicant({ ...applicant, sucetMarks: e.target.value})} value={applicant.sucetMarks} name="sucetMarks" id="sucetMarks" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
            </div>

            <div className="col-span-full mt-8">
            <label htmlFor="remarks" className="block text-sm/6 font-medium text-gray-900">Remarks</label>
            <div className="mt-2">
                <textarea name="remarks" onChange={(e)=> setApplicant({ ...applicant, remarks: e.target.value})} value={applicant.remarks} id="remarks" rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">Write any comment about applicant enquiry.</p>
            </div>
        </div>
        <div className="mt-6 mb-6 flex items-center justify-center gap-x-6">
            <button onClick={()=>navigate('/view-all')} type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">Cancel</button>
            <button onClick={()=>handleSave()} type="submit" className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 cursor-pointer">Update <i className="fa-solid fa-file-pen"></i></button>
        </div>
    </>
  )
}

export default EditApplicant
