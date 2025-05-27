import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import CalculatorModal from './CalculatorModal';
// import { Link, useNavigate } from 'react-router-dom'

const DisplayAll = () => {

    const navigate = useNavigate();

    const [allApplicants, setAllApplicants] = useState([])
    const [user, setUser] = useState(null);

    const [searchMobile, setSearchMobile] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState([]);

    useEffect(()=> {
        axios
          .get('http://localhost:5555/applicants')
          .then((response)=> {
                setAllApplicants(response.data.applicants);
                setFilteredApplicants(response.data.applicants);
          })
          .catch((error)=> {
              alert('Not Data received!')
              console.log(error)
          }) 
      }, []);

    useEffect(() => {
        console.log('Updated applicants state:', allApplicants);
      }, [allApplicants]);

      useEffect(()=>{
        const token = localStorage.getItem('token');

        if (!token) return;

        axios.get('http://localhost:5555/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => setUser(res.data.user))
        .catch((err) => {
        console.error('Error fetching profile:', err.response?.data?.message || err.message);
        });
      }, [])

      const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this applicant?')) return;
      
        axios
          .delete(`http://localhost:5555/applicants/${id}`)
          .then(() => {
            alert('Applicant deleted successfully!');
            // Refresh the list after deletion (refetch or filter)
            setAllApplicants(prev => prev.filter(applicant => applicant._id !== id));
            setFilteredApplicants(prev => prev.filter(applicant => applicant._id !== id));
          })
          .catch((error) => {
            console.error('Error deleting applicant:', error);
            alert('Something went wrong while deleting.');
          });
      };

      const printValidate = (applicant) => {
            if(applicant.applicationNumber === 0 || applicant.sucetMarks === 0) {
                    alert('Please update Application number and SUCET Marks to print allotment Order!')
                    navigate(`/edit/${applicant._id}`)
            } else 
                navigate(`/allotment/${applicant._id}`)
      }

      const formattedDate = (isoDate )=> {
            const date = new Date(isoDate);
            const res = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return res
      }

      const handleSearch = () => {
        const filtered = allApplicants.filter(applicant =>
            applicant.mobileNumber.toString().includes(searchMobile)
        );
        setFilteredApplicants(filtered);
    };

    const handleReset = () => {
        setSearchMobile('');
        setFilteredApplicants(allApplicants);
    };


  return (
    <>

        <div className='w-full flex justify-end px-10 py-3'>
            <CalculatorModal />
            <p className='align-right font-semibold'>&nbsp; &nbsp; Hello, {user ? user.name : "Guest"}</p>
        </div>
        <div className="w-full bg-green-50 py-5">
            <div className='flex justify-between mb-5 px-10'>
                <div className='flex items-center space-x-2'>
                    <input
                        type="text"
                        placeholder="Search by Mobile"
                        value={searchMobile}
                        onChange={(e) => setSearchMobile(e.target.value)}
                        className="w-100 border px-3 py-1 rounded"
                    />
                    <button onClick={handleSearch} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                    <button onClick={handleReset} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 cursor-pointer"><i className="fa-solid fa-users"></i> Show All</button>
                </div>
                <div>
                    <Link to={"/"} className='bg-green-800 text-green-50 font-bold px-4 py-2 rounded-md hover:bg-green-600'>Add New <i className="fa-solid fa-user-plus"></i></Link>
                </div>
            </div>
            <div className='px-1'>
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
                            <th className='text-start p-3 text-gray-600'>Date of Entry</th>
                            <th className='text-start p-3 text-gray-600'>Cousellor</th>
                            <th className='text-start p-3 text-gray-600'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredApplicants.map((applicant, index)=>(
                                <tr key={applicant._id} className='border-b-1 border-gray-300'>
                                    <td className='text-start px-3 py-2'>{index+1}</td>
                                    <td className='text-start px-3'>{applicant.applicationNumber}</td>
                                    <td className='px-3'>{applicant.applicantName}</td>
                                    <td className='text-start px-3'>{applicant.mobileNumber}</td>
                                    <td className='text-start px-3'>{applicant.interMarks}</td>
                                    <td className='text-start px-3'>{applicant.eapcetRank}</td>
                                    <td className='text-start px-3'>{applicant.sucetMarks}</td>
                                    <td className='text-start px-3'>{formattedDate(applicant.createdAt)}</td>
                                    <td className='text-start px-3'>{applicant.counsellorName}</td>
                                    <td className='text-start px-3'>
                                        <Link to={`/edit/${applicant._id}` } className='bg-yellow-500 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={ () => handleDelete(applicant._id) } className='bg-red-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={ ()=> printValidate(applicant) } className='invisible xl:visible bg-green-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-print"></i></button>
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
