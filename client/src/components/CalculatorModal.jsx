import React, { useState } from 'react';

const CalculatorModal = () => {
  const [showModal, setShowModal] = useState(false);

  const [interMarks, setInterMarks] = useState(0)
  const [eapcetRank, setEapcetRank] = useState(0)
  const [sucetMarks, setSucetMarks] = useState(0)
  const [fee, setFee] = useState(0)

  const displayFee =()=> {
        if(interMarks == 0) {
            alert('Enter Intermediate Marks!')
            return;
        }

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

        setFee(fee)
  }

  return (
    <>
      {/* Fixed Calculator Button at Top Right */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 z-50"
      >
        <i className="fa-solid fa-sack-dollar"></i>
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-green-100 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            {/* Close Button */}
            <button
              onClick={() => {setShowModal(false); setFee(0)}}
              className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-600"
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="text-xl text-green-800 font-semibold mb-4">Fee Calculator</h2>
            <div>
                <div className="mt-2">
                    <label htmlFor="interMarks" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>Intermediate Marks</label>
                    <input type="number" onChange={(e)=> setInterMarks(e.target.value) } name="interMarks" id="interMarks" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                <div className="mt-2">
                    <label htmlFor="eapcetRank" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>EAPCET Rank</label>
                    <input type="number" onChange={(e)=> setEapcetRank(e.target.value) } name="eapcetRank" id="eapcetRank" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                <div className="mt-2">
                    <label htmlFor="sucetMarks" className="block text-sm/6 font-medium text-gray-900"><span className='text-red-600'>*</span>SUCET Marks</label>
                    <input type="number" onChange={(e)=> setSucetMarks(e.target.value) } name="sucetMarks" id="sucetMarks" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>

                <div className="text-center mt-2">
                    <button onClick={()=>displayFee()} className='bg-green-800 hover:bg-green-600 cursor-pointer text-green-50 font-semibold px-6 py-2 rounded'>Calculate</button>
                </div>
                {
                    fee == 0 ? '' : 
                    <div className="text-center mt-2 py-3 bg-green-800 rounded">
                        <p className='text-green-50 text-5xl font-bold'>Rs. {fee}</p>
                    </div>
                }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorModal;
