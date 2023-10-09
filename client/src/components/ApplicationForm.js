import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useAddApplicationMutation } from '../store';

const ApplicationForm = ({ jobId, recruiterId, handleApplicationForm }) => {
  const [addApplication, { isLoading, isError }] = useAddApplicationMutation();
  const [sop, setSop] = useState('');
  const [resume, setResume] = useState('');
  useEffect(() => {
      document.body.classList.add('overflow-hidden');

      return () => {
          document.body.classList.remove('overflow-hidden');
      }
  }, []);

  const handleSopChange = (event) => {
    setSop(event.target.value);
  }

  const handleResumeChange = (event) => {
    setResume(event.target.value);
  }

  const handleSubmit = async (event) => {
    try {
      await addApplication({jobId, recruiterId, sop, resume});
      if (isError) alert("Error creating application");
      handleApplicationForm();
    } catch {
      alert("Error!");
    }
  }

  return (
  <div className="w-screen h-screen bg-gray-700 bg-opacity-70 fixed inset-0 z-20 overflow-hidden">
    <div className="max-w-md h-[90%] mx-auto mt-8 p-6 bg-violet-200 shadow-md rounded-md relative overflow-y-auto">
      <div onClick={handleApplicationForm} className='absolute top-4 right-4'><RxCross2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-700 hover:scale-125 transition" /></div>
      <h2 className="text-2xl font-bold mb-6 text-violet-700">Application Form</h2>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="name">
        Statement of purpose
        </label>
        <textarea
          className="block h-48 p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
          id="sop"
          value={sop}
          onChange={handleSopChange}
          name="sop"
          placeholder="Enter Statement of purpose"
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="name">
          Resume Link
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="resume"
          value={resume}
          onChange={handleResumeChange}
          name="resume"
          placeholder="Enter your resume link"
        />
      </div>
      
      <button
        className={`w-full ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring ${
          isLoading ? "" : "focus:ring-indigo-300 focus:border-indigo-500"
        }`}
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Please wait" : "Submit"}
      </button>
    </div>
  </div>
  );
};

export default ApplicationForm;
