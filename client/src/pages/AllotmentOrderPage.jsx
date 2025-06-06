import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import signature from '../assets/srinivar_sign.png'

const AllotmentOrderPage = () => {

    const [totalFee, setTotalFee] = useState(450000)

    const getTwoDigits = (n)=> {
        if(n < 10)
            return '0'+n
        return n
    }

    const today = new Date();
    const formattedDate = `${getTwoDigits(today.getDate())}-${getTwoDigits(today.getMonth() + 1)}-${today.getFullYear()}`;


    const navigate = useNavigate();
    
    const [applicant, setApplicant] = useState({});
    
    const {id} = useParams()

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

    function getSixthDayFromToday() {
        const today = new Date();
        const sixthDay = new Date(today);
        sixthDay.setDate(today.getDate() + 6);

        const day = String(sixthDay.getDate()).padStart(2, '0');
        const month = String(sixthDay.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = sixthDay.getFullYear();

        return `${day}-${month}-${year}`;
    }

    const handlePrint = () => {
        window.print()
        navigate('/view-all')
    }


  return (
    <>
        <div className="w-full px-5 flex flex-row justify-between items-start">
            <div>
                <p className="my-0">To</p>
                <p className="my-0 font-bold" id="applicantName">Mr/Ms. {applicant.applicantName}</p>
                <p className="my-0">Application No: {applicant.applicationNumber}</p>
                <p className="my-0">Mobile No.: {applicant.mobileNumber}</p>
            </div>
            <div>
                Date: {formattedDate}
            </div>
        </div>
        <div className="w-full text-center my-3">
            <span className='text-xl bg-green-50 px-3 py-1 rounded-full font-bold text-green-800'>Admission Offer to B.Tech Program with Special Merit Scholarship –2025-2026 Reg.</span>
        </div>
        <div className="w-full px-5">
            <p>Dear Mr/Ms. <span className="font-bold">{applicant.applicantName}</span>,</p>
            <p>Greetings from <span className="font-bold">Sreenidhi University</span>!</p>
            <p className='text-justify'>We are happy to offer you a provisional admission to the <span className="font-bold">B. Tech program</span> at Sreenidhi University for the academic year <span className="font-bold">2025-2026</span>, based on your commendable performance in <span className="font-bold">SUCET / EAMCET / JEE / and 10+2 examinations</span>.</p>
            <p className="font-bold mt-3">Offered Program Options (as per your academic merit and preferences) will be in the attached annexure.</p>
            <p className="font-bold mt-3">Special Merit Scholarship:</p>
            <p className='text-justify'>We are pleased to inform you that the <span className="font-bold">annual tuition fee</span> for your program is <span className="font-bold text-blue-600">Rs. 4,50,000/-</span>. Based on the evaluation of your academic performance and qualifying examination scores, you have been awarded a <span className="font-bold">Special Merit Scholarship of <span className="text-blue-600">Rs. {totalFee - applicant.feePayable}/-</span></span>. <span className="font-bold">Congratulations on this achievement!</span> The scholarship amount will be <span className="font-bold">adjusted against your annual tuition fee</span> as per the university’s rules and regulations and the net payable annual fee will be <span className="font-bold text-blue-600">Rs. {applicant.feePayable}/-</span>.</p>
            <p className="text-red-600 font-bold">This offer is valid </p>
            <p>The continuation of this scholarship in subsequent years is subject to your academic performance, as outlined below:</p>
            <div className="px-5">
                <table className="border my-0">
                    <tr className="border m-0">
                        <td className="font-bold border px-2">CGPA Range</td>
                        <td className="font-bold px-2">Scholarship Status</td>
                    </tr>
                    <tr className="border m-0">
                        <td className="border px-2">CGPA 8.0 &amp; above</td>
                        <td className=' px-2'>Scholarship slab increases by one level</td>
                    </tr>
                    <tr className="border m-0">
                        <td className="border px-2">CGPA 7.0 – 7.99</td>
                        <td className='px-2'>Scholarship continues in the current slab</td>
                    </tr>
                    <tr className="border m-0">
                        <td className="border px-2">CGPA below 7.0</td>
                        <td className='px-2'>Scholarship reduced by one slab</td>
                    </tr>
                </table>
            </div>
            <p className="text-xs"><em>Note: The scholarship slab will vary every year based on your CGPA.</em></p>
            <p>A detailed <span className="font-bold">slab-wise tuition fee and eligibility chart</span> is enclosed for your reference.</p>
            <p className="font-bold mt-3">Alternative Industry-Integrated Option:</p>
            <p className='text-justify'>You are also eligible for the <span className="font-bold">B.Tech CSE – Cloud ERP (SAP)</span> program, a career-focused curriculum, designed and delivered by industry professionals at an additional fee, with <span className="font-bold">guaranteed paid internships in the final year</span> for all qualifying students.</p>
            <p className="font-bold mt-3">Admission Confirmation:</p>
            <p>Please report to the university between <span className="font-bold text-red-600">{formattedDate}</span> to <span className="font-bold text-red-600">{getSixthDayFromToday()}</span> and complete the admission formalities by submitting:</p>
            <div className='pl-5'>
                <ul>
                    <li>- This Admission Letter - Original certificates of 10th & 12th (Marks Memo and TC)</li>
                    <li>- Photocopy of EAMCET / JEE rank card - Aadhar Card, 4 Passport-size Photographs</li>
                    <li>- Payment of Fees: Admission Fee: Rs. 20,000/- Interest Free Deposit: Rs. 20,000/-</li>
                    <li>- Tuition Fee (as per merit): Minimum 50% payable at admission, balance within one month</li>
                </ul>
            </div>
            <p><span className="font-bold">Note:</span> Admission will be confirmed only upon fulfilment of all criteria mentioned above. If any discrepancies occur in the marks/documents it may result in withdrawal of this provisional admission.</p>
            <p className='text-justify'>Admissions are strictly based on <span className="font-bold">merit</span> and <span className="font-bold">first-come, first-served</span> basis. There is <span className="font-bold">no management quota</span>, and we advise not to entertain any intermediaries or consultants. We look forward to welcoming you to the vibrant campus of Sreenidhi University.</p>
        </div>
        <div className="w-full px-5 mt-5">
            <p>Warm regards,</p>
            <img src={signature} className="w-50" alt="" />
            <p className="font-bold m-0">Director – Admissions</p>
            <p className="font-bold">Sreenidhi University Admissions Office</p>
        </div>
        <div className="w-full flex justify-center gap-3 mb-3">
            <button onClick={()=>navigate('/view-all')} type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">Cancel</button>
            <button onClick={()=>handlePrint()} type="submit" className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 cursor-pointer">Print <i className="fa-solid fa-print"></i></button>
        </div>
    </>
  )
}

export default AllotmentOrderPage
