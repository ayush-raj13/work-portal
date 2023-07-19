import React from 'react';
import moment from "moment";
import { BsCalendar2Date } from "react-icons/bs";
import { MdFeaturedPlayList } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { GiDuration } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const JobCard = ({job}) => {
  const {  title,
    dateOfPosting,
    skillsets,
    deadline,
    jobType,
    duration,
    salary,
    country,
    city} = job
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-violet-800 text-white px-6 py-4 lg:flex lg:space-x-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className='hidden lg:flex'>{skillsets.map((skill, index) => <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-violet-100 text-violet-900' key={index}>{skill}</span>)}</div>
      </div>
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-3 lg:gap-3 sm:grid-cols-2 sm:gap-2 px-6 py-4 items-start">
        <div className="flex items-center mb-4">
          <BsCalendar2Date className="h-5 w-5 text-violet-800 mr-2" />
          <p className="text-black">Posted On: {moment(dateOfPosting).format('MMMM Do YYYY')}</p>
        </div>
        <div className="flex items-center mb-4">
          <BiTimeFive className="h-5 w-5 text-violet-800 mr-2" />
          <p className="text-black">Deadline: {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <div className="flex items-center mb-4">
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
        <div className="flex items-center mb-4">
          <GiDuration className="h-5 w-5 text-violet-800 mr-2" />
          <p className="text-black">Duration: {duration}</p>
        </div>
        <div className="flex items-center mb-4">
          <GiReceiveMoney className="h-5 w-5 text-violet-800 mr-2" />
          <p className="text-black">Salary: {salary}</p>
        </div>
        <div className="flex items-center">
          <HiOutlineLocationMarker className="h-5 w-5 text-violet-800 mr-2" />
          <p className="text-black">
            Location: {city}, {country}
          </p>
        </div>
      </div>
      <div className="flex items-start mb-4 lg:hidden px-6">
          <MdFeaturedPlayList className="h-5 w-5 text-violet-800 mr-2" />
          <div className="text-black flex space-x-3">
            <div>Skillsets: </div><div className='grid grid-flow-row sm:grid-flow-col gap-2'>{skillsets.map((skill, index) => <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-violet-900 text-violet-100' key={index}>{skill}</span>)}</div>
          </div>
        </div>
    </div>
  );
};

export default JobCard;
