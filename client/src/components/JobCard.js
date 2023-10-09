import React, { useState } from 'react';
import moment from "moment";
import { BsCalendar2Date } from "react-icons/bs";
import { MdFeaturedPlayList } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { GiDuration } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ApplicationForm from './ApplicationForm';
import ApplicantModal from './ApplicantModal';
import { AiOutlineUser } from 'react-icons/ai';

const JobCard = ({job}) => {
  const [showExpanded, setShowExpanded] = useState(false);
  const { _id, 
    title,
    recruiterId,
    dateOfPosting,
    skillsets,
    deadline,
    jobType,
    duration,
    salary,
    country,
    city,
    maxPositions,
    responsibilities,
    qualifications,
    preferredQualifications,
    experience} = job
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const handleApplicationForm = () => {
      setShowApplicationForm(!showApplicationForm);
    }

    const handleJobCardClick = () => {
      setShowExpanded(true);
    }

    const handleJobCardClose = () => {
      setShowExpanded(false);
    }

    const modal = <ApplicantModal handleApplicationForm={handleApplicationForm} job={job} onClose={handleJobCardClose} actionBar={<button className="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={handleJobCardClose}>Close</button>}></ApplicantModal>

    const card = 
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer" onClick={handleJobCardClick}>
  <div className="bg-violet-800 text-white px-6 py-4 flex space-x-5 items-start">
    <img
      src={ recruiterId.image }
      alt="Profile"
      className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
    />
    <div className='flex flex-col justify-between'>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className='font-thin'>
        {recruiterId.name}&nbsp;&nbsp;
        <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-[#40128B] text-violet-100'>{recruiterId.username}</span>
      </div>
    </div>
    <div className='hidden lg:flex'>
      {skillsets.map((skill, index) => (
        <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-violet-100 text-violet-900' key={index}>{skill}</span>
      ))}
    </div>
  </div>
  <div className="grid grid-cols-1 gap-1 lg:grid-cols-3 lg:gap-3 sm:grid-cols-2 sm:gap-2 px-6 py-4 items-start">
    <div className="flex items-center mb-2">
      <BsCalendar2Date className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">Posted On: {moment(dateOfPosting).format('MMMM Do YYYY')}</p>
    </div>
    <div className="flex items-center mb-2">
      <BiTimeFive className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">Deadline: {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
    <div className="flex items-center mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-violet-800 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a7 7 0 110 14 7 7 0 010-14zm2 7a2 2 0 11-4 0 2 2 0 014 0zM5 7a2 2 0 114 0 2 2 0 01-4 0zm9 0a2 2 0 114 0 2 2 0 01-4 0z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-black">Job Type: {jobType}</p>
    </div>
    <div className="flex items-center mb-2">
      <GiDuration className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">Duration: {duration} months</p>
    </div>
    <div className="flex items-center mb-2">
      <GiReceiveMoney className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">Salary: {salary}</p>
    </div>
    {/* Minimum Experience Required */}
    <div className="flex items-center mb-2">
      <AiOutlineUser className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">Minimum Experience Required: {experience} years</p>
    </div>
    <div className="flex items-center">
      <HiOutlineLocationMarker className="h-5 w-5 text-violet-800 mr-2" />
      <p className="text-black">
        Location: {city}, {country}
      </p>
    </div>
  </div>
  <div className="flex items-start mb-2 lg:hidden px-6">
    <MdFeaturedPlayList className="h-5 w-5 text-violet-800 mr-2" />
    <div className="text-black flex space-x-3">
      <div>Skillsets: </div>
      <div className='grid grid-flow-row sm:grid-flow-col gap-2'>
        {skillsets.map((skill, index) => (
          <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-violet-900 text-violet-100' key={index}>{skill}</span>
        ))}
      </div>
    </div>
  </div>
</div>
    
  return (
    <>
      {showApplicationForm && <ApplicationForm handleApplicationForm={handleApplicationForm} jobId={_id} recruiterId={recruiterId._id} />}
      {!showExpanded && card}
      {showExpanded && modal}
    </>
  );
};

export default JobCard;
