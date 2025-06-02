import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import CalculatorModal from './CalculatorModal';
// import { Link, useNavigate } from 'react-router-dom'

import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const DisplayAll = () => {

    const navigate = useNavigate();

    const [allApplicants, setAllApplicants] = useState([])
    const [user, setUser] = useState(null);

    const [searchMobile, setSearchMobile] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState([]);

    useEffect(()=> {
        axios
          .get('https://admissions-3x9g.onrender.com/applicants')
          .then((response)=> {
                const sortedApplicants = response.data.applicants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllApplicants(sortedApplicants);
                setFilteredApplicants(sortedApplicants);
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

        axios.get('https://admissions-3x9g.onrender.com/auth/profile', {
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
          .delete(`https://admissions-3x9g.onrender.com/applicants/${id}`)
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
            // const res = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            return res
      }

      const showDate = (isoDate )=> {
        const date = new Date(isoDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const res = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        const res = `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`;
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

    const getTodaysCount = () => {
        const today = new Date();
        return allApplicants.filter((applicant) => {
          const createdAt = new Date(applicant.createdAt);
          return (
            createdAt.getDate() === today.getDate() &&
            createdAt.getMonth() === today.getMonth() &&
            createdAt.getFullYear() === today.getFullYear()
          );
        }).length;
    };

    const getLast7DaysCount = () => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
      
        return allApplicants.filter((applicant) => {
          const createdAt = new Date(applicant.createdAt);
          return createdAt >= sevenDaysAgo;
        }).length;
      };

      


  return (
    <>
        {/* Calculator and counters */}
        <div className='w-full fixed bottom-1 flex justify-between gap-3 bg-blue-100 px-5 py-2'>

            {/* Counters */}
            <div className='flex flex-col justify-center items-center bg-blue-800 hover:bg-blue-500 rounded-lg px-2'>
                <p className="text-blue-100 text-xs font-bold">Today</p>
                <p className='text-white text-xl font-bold'>{getTodaysCount()}</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-blue-800 hover:bg-blue-500 rounded-lg px-2'>
                <p className="text-blue-100 text-xs font-bold">7 Days</p>
                <p className='text-white text-xl font-bold'>{getLast7DaysCount()}</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-blue-800 hover:bg-blue-500 rounded-lg px-2'>
                <p className="text-blue-100 text-xs font-bold">Total</p>
                <p className='text-white text-xl font-bold'>{allApplicants.length}</p>
            </div>
            

            <CalculatorModal />
        </div>
        

        {/* User or Counsellor Info */}
        <div className='w-full flex justify-center md:justify-end px-3 md:px-10 py-3'>
            <p className='align-right font-semibold'>Hello, {user ? user.name : "Guest"}</p>
        </div>

        {/* Full Body */}
        <div className="w-full bg-green-50 py-5 pb-20">

            {/* Search Bar and Add New Applicant */}
            <div className='flex items-center gap-3 justify-between mb-5 px-3 md:px-10'>
                <div className='w-80 flex items-center justify-center px-4 bg-green-200 rounded-full'>
                    <input
                        type="text"
                        placeholder="search by mobile"
                        value={searchMobile}
                        onChange={(e) => setSearchMobile(e.target.value)}
                        className="w-full text-sx bg-transparent py-[11px] outline-none"
                    />

                    {
                        searchMobile 
                        &&
                        <IoMdClose className='text-2xl font-bold text-green-600 cursor-pointer hover:text-green-900 mr-3' onClick={handleReset} />
                    }
                    <FaMagnifyingGlass className='text-green-600 text-xl cursor-pointer hover:text-green-900' onClick={handleSearch}></FaMagnifyingGlass>
                    {/* <button onClick={handleSearch} className="bg-blue-600 text-white ml-[-8px] h-9 px-3 py-1 rounded-lg hover:bg-blue-700 cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                    
                </div>
                <div>
                    {/* <button onClick={handleReset} className="bg-gray-400 h-9 text-green-50 mx-2 px-3 py-1 rounded-md hover:bg-gray-500 cursor-pointer"><i className="fa-solid fa-users"></i> <span className='hidden lg:inline'>Show All</span> </button> */}
                    <Link to={"/"} className='bg-green-800 text-green-50 h-9 font-bold mx-2 px-3 py-2 rounded-md hover:bg-green-600'><span className='hidden lg:inline'>Add New</span> <i className="fa-solid fa-user-plus"></i></Link>
                </div>
            </div>

            {/* md: Display All */}
            <div className='flex justify-center bg-gray-50 mx-3 overflow-auto rounded-lg shadow-md hidden md:block'>
                <table className="table-auto w-full">
                    <thead>
                        <tr className='w-full bg-gray-200 border-b border-gray-200'>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>S No</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Application Number</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Name of the Applicant</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Mobile Number</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Inter Marks</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>EAPCET Rank</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>SUCET Marks</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Date of Entry</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Cousellor</th>
                            <th className='text-start p-3 text-gray-500 whitespace-nowrap text-md'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredApplicants.map((applicant, index)=>(
                                <tr key={applicant._id} className='border-b-1 border-gray-300'>
                                    <td className='text-start px-3 py-2 whitespace-nowrap text-md'>{index+1}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.applicationNumber}</td>
                                    <td className='px-3 whitespace-nowrap text-md'>{applicant.applicantName}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.mobileNumber}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.interMarks}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.eapcetRank}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.sucetMarks}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{formattedDate(applicant.createdAt)}</td>
                                    <td className='text-start px-3 whitespace-nowrap text-md'>{applicant.counsellorName}</td>
                                    <td className='text-start px-3 whitespace-nowrap'>
                                        <div className='flex justify-center items-center'>
                                            <Link to={`/edit/${applicant._id}` } className='flex justify-center items-center w-9 h-9 bg-blue-800 hover:bg-blue-500 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-pen-to-square"></i></Link>
                                            {/* <button onClick={ () => handleDelete(applicant._id) } className='w-9 h-9 flex items-center justify-center bg-red-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-trash"></i></button> */}
                                            <button onClick={ ()=> printValidate(applicant) } className='flex justify-center items-center w-9 h-9 invisible xl:visible bg-green-800 hover:bg-green-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-print"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                       
                        
                    </tbody>
                </table>
            </div>

            {/* xs, sm: Display All */}
            <div className='grid grid-cols-1 sm:grid-cols-2 mx-3 gap-3 md:hidden'>
                {
                    filteredApplicants.map((applicant, index)=>(
                        <div className="bg-green-100 border border-green-200 p-4 shadow-md rounded-lg">
                            <div className='flex justify-between items-center space-x-2 text-sm border-b border-gray-200 my-1'>
                            <div className='text-gray-600'>{applicant.applicationNumber}</div>
                                <div className='text-gray-600 font-bold'>{applicant.applicantName}</div>
                                <div className='text-gray-600'>{applicant.mobileNumber}</div>
                                <div className='flex justify-center items-center pb-1'>
                                    <Link to={`/edit/${applicant._id}` } className='text-blue-800 hover:text-blue-500 text-md cursor-pointer'><i className="fa-solid fa-pen-to-square"></i></Link>
                                    {/* <button onClick={ () => handleDelete(applicant._id) } className='w-9 h-9 flex items-center justify-center bg-red-600 rounded px-4 py-1 mx-1 text-green-50 cursor-pointer'><i className="fa-solid fa-trash"></i></button> */}
                                    {/* <button onClick={ ()=> printValidate(applicant) } className='invisible xl:visible text-green-800 hover:text-green-600 px-2 py-1 mx-1 cursor-pointer'><i className="fa-solid fa-print"></i></button> */}
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='text-xs bg-green-50 rounded-md px-2 py-1'>{applicant.interMarks} | {applicant.eapcetRank} | {applicant.sucetMarks}</div>
                                <div className='flex'>
                                    <div className='text-xs text-gray-500'>{applicant.counsellorName} | {showDate(applicant.createdAt)}</div>
                                    <div className='text-xs text-gray-500'></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default DisplayAll
