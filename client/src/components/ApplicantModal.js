import ReactDOM from "react-dom";
import { useEffect } from "react";
import { GoLocation } from 'react-icons/go'
import { MdCategory, MdEmail } from 'react-icons/md'
import { BsBriefcaseFill, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { AiOutlineArrowRight, AiOutlineDollarCircle, AiOutlineUser } from 'react-icons/ai'
import { RiUserSearchFill } from 'react-icons/ri'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa'
import moment from "moment";
import { useFetchApplicationsQuery } from "../store";
import useAuthTokenContext from "../hooks/use-auth-token";
import Skeleton from "./Skeleton";

function ApplicantModal({ job, onClose, actionBar, handleApplicationForm }) {
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
    const { authToken } = useAuthTokenContext();
    const { data, error, isFetching } = useFetchApplicationsQuery({ jobId: _id, applicantId: authToken.id});
    console.log(data?.applications.length);
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="fixed inset-[4%] sm:inset-20 rounded-lg bg-gray-100 border flex flex-col justify-between pb-4 items-center">
                <div className="h-[90%] w-full overflow-y-auto">
                  {/* Modal content */}
                  <div className='w-full  py-20 flex items-center lg:px-8 px-2  justify-center flex-col  '>
                      <div className='w-full h-40 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col'>
                          <h1 className='text-3xl'>Job Details</h1>
                      </div>
                      <div className='flex items-center  justify-center w-full py-10'>
                          <div className='flex w-full px-8 lg:px-20 items-start lg:flex-row flex-col lg:justify-between justify-center'>
                              <div className='flex mb-1 items-center justify-center'>
                                  <img src={recruiterId.image} alt="" className='w-24 h-24 rounded-full border-2 border-white shadow-lg object-cover' />
                                  <div className='px-4 mx-2 flex flex-col items-start justify-center'>
                                      <p className='font-semibold text-base mb-1' >{title} </p>
                                      <p className=' text-sm text-gray-800 mb-1'>{recruiterId.name}</p>
                                  </div>

                              </div>
                              <div className='lg:px-4 mb-1 px-2 lg:mx-2 flex flex-col items-start justify-center'>
                                  <div className='flex items-center justify-center mb-1'>
                                      <BsBriefcaseFill className='text-xs font-semibold text-indigo-600' />
                                      <p className='font-semibold text-base mx-1'>Job Type </p>
                                      <p className='text-sm text-gray-800 mx-1'>{jobType}</p>
                                  </div>
                                  <div className='flex items-center justify-center mb-1'>
                                      <MdEmail className='text-xs font-semibold text-indigo-600' />
                                      <p className='font-semibold text-base mx-1'>Email </p>
                                      <p className=' text-sm text-gray-800 mx-1'>{recruiterId.contactEmail}</p>
                                  </div>
                              </div>
                              <div className='lg:px-4 mb-1 px-2 lg:mx-2 flex flex-col items-start justify-center'>
                                  <div className='flex items-center justify-center mb-1'>
                                      <GoLocation className='text-xs font-semibold text-indigo-600' />
                                      <p className='font-semibold text-base mx-1'>Location </p>
                                      <p className=' text-sm text-gray-800 mx-1'>{city}, {country}</p>
                                  </div>
                                  <div className='flex items-center justify-center mb-1'>
                                      <AiOutlineDollarCircle className='text-xs font-semibold text-indigo-600' />
                                      <p className='font-semibold text-base mx-1'>Salary </p>
                                      <p className=' text-sm text-gray-800 mx-1'>$ {salary} </p>
                                  </div>
                              </div>
                              <div className='flex items-center justify-center'>
                                  {
                                      authToken.userType === "recruiter" ? (
                                          <p className='text-xs text-red-500'>unable Apply to jobs</p>
                                      ) : (
                                          <div className='flex items-center justify-center  '>
                                              <BsFillBookmarkCheckFill className='text-indigo-600 text-4xl cursor-pointer  mx-2'/>
                                              {isFetching ? <Skeleton className='w-48 h-14' times={1}></Skeleton> : <></>}
                                              {!isFetching && data.applications.length && data.applications[0].status !== "rejected" ? <button onClick={handleApplicationForm} disabled className='lg:px-6 lg:py-3 px-3 py-2 mt-2 lg:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white disabled:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60'>{data.applications[0].status}</button> : <></>}
                                              {!isFetching && data.applications.length && data.applications[0].status === "rejected" ? <button onClick={handleApplicationForm} disabled className='lg:px-6 lg:py-3 px-3 py-2 mt-2 lg:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white disabled:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60'>{data.applications[0].status}</button> : <></>}
                                              {!isFetching && !data.applications.length ? <button onClick={handleApplicationForm} className='lg:px-6 lg:py-3 px-3 py-2 mt-2 lg:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white  '>Apply Position</button> : <></>}
                                          </div>
                                      )
                                  }
                              </div>
                          </div>
                      </div>
                      <div className='w-full lg:px-4 py-2 flex items-center lg:items-start lg:flex-row flex-col justify-start lg:justify-center'>
                          <div className='lg:w-8/12 w-full lg:px-4 ml-16 lg:ml-24 2xl:ml-60 py-8 flex flex-col items-start content-start justify-center '>
                              <h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Skills Required</h1>
                              <ul className='pb-8 list-disc'>
                                {skillsets.map((skill, index) => (
                                  <li key={index}>
                                    <p className='px-4'>{skill}</p>
                                  </li>
                                ))}
                              </ul>
                              {responsibilities !== undefined ? <><h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Responsibilities</h1>
                              <ul className='pb-8 list-disc'>
                                {responsibilities.map((responsibility, index) => (
                                  <li key={index}>
                                    <p className='px-4'>{responsibility}</p>
                                  </li>
                                ))}
                              </ul></> : <></>}
                              {qualifications !== undefined ? <><h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Qualifications</h1>
                              <ul className='pb-8 list-disc'>
                                {qualifications.map((qualification, index) => (
                                  <li key={index}>
                                    <p className='px-4'>{qualification}</p>
                                  </li>
                                ))}
                              </ul></> : <></>}
                              {preferredQualifications !== undefined ? <><h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Preferred Qualifications</h1>
                              <ul className='pb-8 list-disc'>
                                {preferredQualifications.map((qualification, index) => (
                                  <li key={index}>
                                    <p className='px-4'>{qualification}</p>
                                  </li>
                                ))}
                              </ul></> : <></>}
                          </div>
                          <div className='lg:w-4/12 w-full py-8 px-4 lg:px-10'>
                              <h1 className=' text-2xl font-semibold mb-2'>Job Summary</h1>
                              <div className='flex items-center justify-start mb-3'>
                                  <RiUserSearchFill className='text-base font-semibold text-indigo-600' />
                                  <p className='font-semibold text-base mx-1'>Total Vacancies </p>
                                  <p className=' text-sm text-gray-800 mx-1'>{maxPositions}</p>
                              </div>
                              <div className='flex items-center justify-start mb-3'>
                                  <BsFillCalendar2DateFill className='text-base font-semibold text-indigo-600' />
                                  <p className='font-semibold text-base mx-1'>Dead Line</p>
                                  <p className=' text-sm text-gray-800 mx-1'>{moment(deadline).format('MMMM Do YYYY')}</p>
                              </div>
                              <div className='flex items-center justify-start mb-3'>
                                  <HiOutlineStar className='text-base font-semibold text-indigo-600' />
                                  <p className='font-semibold text-base mx-1'>Experience Required</p>
                                  <p className=' text-sm text-gray-800 mx-1'>{experience < 12 ? experience + " month(s)" : round(experience/12.0, 1) + " year(s)"}</p>
                              </div>
                          </div>
                      </div>
                  </div>                  
                </div>
                <div className='flex w-full justify-center items-end'>
                    {actionBar}
                </div>               
            </div>
        </div>,

        document.querySelector('.modal-container')
    );
}

export default ApplicantModal