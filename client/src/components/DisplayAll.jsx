import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom'

const DisplayAll = () => {

    const [allApplicants, setAllApplicants] = useState([])

    useEffect(()=> {
        axios
          .get('http://localhost:5555/applicants')
          .then((response)=> {
                setAllApplicants(response.data.applicants);
          })
          .catch((error)=> {
              alert('Not Data received!')
              console.log(error)
          }) 
      }, []);

    useEffect(() => {
        console.log('Updated applicants state:', allApplicants);
      }, [allApplicants]);

      const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this applicant?')) return;
      
        axios
          .delete(`http://localhost:5555/applicants/${id}`)
          .then(() => {
            alert('Applicant deleted successfully!');
            // Refresh the list after deletion (refetch or filter)
            setAllApplicants(prev => prev.filter(applicant => applicant._id !== id));
          })
          .catch((error) => {
            console.error('Error deleting applicant:', error);
            alert('Something went wrong while deleting.');
          });
      };


  return (
    <>
        <div className="w-full bg-green-50 flex flex-col justify-center items-center py-5">
            <div className='mb-5'>
                <Link to={"/"} className='bg-green-800 text-green-50 font-bold px-4 py-2 rounded-md hover:bg-green-600'>Add New <i className="fa-solid fa-user-plus"></i></Link>
            </div>
            <div>
                <table className="table-auto border border-gray-300">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='text-start p-3 text-gray-600'>S No</th>
                            <th className='text-start p-3 text-gray-600'>Application Number</th>
                            <th className='text-start p-3 text-gray-600'>Name of the Applicant</th>
                            <th className='text-start p-3 text-gray-600'>Mobile Number</th>
                            <th className='text-start p-3 text-gray-600'>Inter Marks</th>
                            <th className='text-start p-3 text-gray-600'>EAPCET Rank</th>
                            <th className='text-start p-3 text-gray-600'>SUCET Marks</th>
                            <th className='text-start p-3 text-gray-600'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allApplicants.map((applicant, index)=>(
                                <tr key={applicant._id} className='border-b-1 border-gray-300'>
                                    <td className='text-start px-3 py-2'>{index+1}</td>
                                    <td className='text-start px-3'>{applicant.applicationNumber}</td>
                                    <td className='px-3'>{applicant.applicantName}</td>
                                    <td className='text-start px-3'>{applicant.mobileNumber}</td>
                                    <td className='text-start px-3'>{applicant.interMarks}</td>
                                    <td className='text-start px-3'>{applicant.eapcetRank}</td>
                                    <td className='text-start px-3'>{applicant.sucetMarks}</td>
                                    <td className='text-start px-3'>
                                        <Link to={`/edit/${applicant._id}`} className='bg-yellow-500 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={() => handleDelete(applicant._id)} className='bg-red-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-trash"></i></button>
                                        <Link to={`/allotment/${applicant._id}`} className='invisible xl:visible bg-green-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-print"></i></Link>
                                    </td>
                                </tr>
                            ))
                        }
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DisplayAll
