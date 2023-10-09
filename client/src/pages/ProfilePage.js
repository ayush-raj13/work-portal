import React, { useState } from 'react';
import useAuthTokenContext from '../hooks/use-auth-token';
import { useFetchApplicationsQuery, useFetchJobApplicantsQuery } from '../store';
import moment from 'moment';
import { useFetchRecruitersQuery } from '../store/apis/recruiterApi';
import UpdateRecruiterDetailsForm from '../components/UpdateRecruiterDetailsForm';
import { Cookies } from "react-cookie";
import useNavigation from "../hooks/use-navigation";
import axios from 'axios';
import UpdateApplicantDetailsForm from '../components/UpdateApplicantForm';

const ProfilePage = () => {
  const { navigate, currentPath } = useNavigation();
  const cookies = new Cookies();

  const [seeAllRoles, setSeeAllRoles] = useState(false);
  const [showRecruiterForm, setShowRecruiterForm] = useState(false);
  const [showJobApplicantForm, setShowJobApplicantForm] = useState(false);
  const { authToken } = useAuthTokenContext();
  const { id, userType } = authToken;
  const { data: applicantData, error: applicantError, isFetching: applicantIsFetching } = useFetchJobApplicantsQuery({ applicantId: id});
  const { data: applicationData, error: applicationError, isFetching: applicationIsFetching } = useFetchApplicationsQuery({ applicantId: id});
  const { data: recruiterData, error: recruiterError, isFetching: recruiterIsFetching } = useFetchRecruitersQuery({ recruiterId: id});
  if (userType === "applicant" && !applicantIsFetching && !applicantError) {
    var { _id: applicant_id, name: applicantName, headline, image: applicantImage, education, skills, experience, projects, achievements, courses, applicantId } = applicantData.jobApplicants[0];
  } else if (userType === "recruiter" && !recruiterIsFetching && !recruiterError) {
    var { _id: recruiter_id, name: recruiterName, recruiterId, contactEmail, bio, ats, fund, image: recruiterImage, roles } = recruiterData.recruiters[0];
  }

  const handleShowRecruiterForm = () => {
    setShowRecruiterForm(!showRecruiterForm);
  }

  const handleShowJobApplicantForm = () => {
    setShowJobApplicantForm(!showJobApplicantForm);
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/logout`, { withCredentials: true });
      if (res.data.done) {
        cookies.remove('connect.sid', { path: '/' });
        cookies.remove('user', { path: '/' });
        if (currentPath !== "/") {
          navigate("/");
        }
      }
    } catch {
      alert("Error logging out!");
    }
  }

  const rightTopHalfBorder = {
    content: '""',
    position: 'absolute',
    right: '-8px',
    zIndex: '10',
    top: '0',
    width: '8px',
    height: '96px', // or '100px'
    background: '#3F1D38',
  };

  const rightBottomHalfBorder = {
    content: '""',
    position: 'absolute',
    right: '-8px',
    zIndex: '10',
    bottom: '0',
    width: '8px',
    height: '96px', // or '100px'
    background: '#3F1D38',
  };

  const toprightTopHalfBorder = {
    content: '""',
    position: 'absolute',
    right: '-8px',
    zIndex: '10',
    top: '-8px',
    height: '8px',
    width: '96px', // or '100px'
    background: '#3F1D38',
  };

  const topLeftHalfBorder = {
    content: '""',
    position: 'absolute',
    left: '-8px',
    zIndex: '10',
    top: '-8px',
    height: '8px',
    width: '96px', // or '100px'
    background: '#3F1D38',
  };

  const leftBottomHalfBorder = {
    content: '""',
    position: 'absolute',
    left: '-8px',
    zIndex: '10',
    bottom: '0',
    width: '8px',
    height: '96px', // or '100px'
    background: '#3F1D38',
  };

  const lefttoprightTopHalfBorder = {
    content: '""',
    position: 'absolute',
    left: '-8px',
    zIndex: '10',
    top: '0',
    width: '8px',
    height: '96px', // or '100px'
    background: '#3F1D38',
  };

  const bottomleftBottomHalfBorder = {
    content: '""',
    position: 'absolute',
    left: '-8px',
    zIndex: '10',
    bottom: '-8px',
    height: '8px',
    width: '96px', // or '100px'
    background: '#3F1D38',
  };

  const bottomrightTopHalfBorder = {
    content: '""',
    position: 'absolute',
    right: '-8px',
    zIndex: '10',
    bottom: '-8px',
    height: '8px',
    width: '96px', // or '100px'
    background: '#3F1D38',
  };

  let content = <div>Loading...</div>;
  if (applicantError) {
    content = <div>Error!</div>;
  }
  if (userType === "applicant" && !applicantIsFetching && !applicantError) {
    content = 
    <div className="bg-gray-100 min-h-screen w-screen font-sans">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-semibold text-violet-700 mb-8">Education</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-violet-100 p-6 rounded-lg border border-violet-200 transform hover:scale-105 transition"
            >
              <p className="text-lg font-semibold text-gray-800 mb-2">{edu.institutionName}</p>
              <p className="text-gray-500 mb-4">{edu.startYear} - {edu.endYear || "Present"}</p>
              <p className="text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Skills</h2>
        
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <p
              key={index}
              className="mr-3 mb-3 inline-block bg-violet-200 text-violet-700 px-4 py-2 rounded-full shadow-md transition hover:shadow-lg"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Experience</h2>
        
        <div className="relative">
          {experience.map((exp, index) => (
            <div key={index} className="flex items-start pb-6 space-x-4 transition duration-300 transform hover:scale-105">
              <div className="w-8 h-8 flex items-center justify-center bg-violet-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-700" viewBox="0 0 20 20" fill="currentColor">
                  <circle cx="10" cy="10" r="6" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{exp.title}</p>
                <p className="text-gray-600">{exp.companyName}, {exp.location}</p>
                <p className="text-gray-600">{moment(exp.startDate).format('MMM YYYY')} - {exp.endDate ? moment(exp.endDate).format('MMM YYYY') : "Present"}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Projects</h2>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col border border-gray-200 p-4 rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
              <p className="text-xl font-semibold text-gray-800">{project.title}</p>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex space-x-4">
                {project.demoLink && (
                  <a href={project.demoLink} className="text-violet-500 hover:underline">
                    Demo Link
                  </a>
                )}
                {project.repositoryLink && (
                  <a href={project.repositoryLink} className="text-violet-500 hover:underline">
                    Repository Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Achievements</h2>
        
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex flex-col border border-gray-200 p-4 rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
              <p className="text-xl font-semibold text-gray-800">{achievement.title}</p>
              <p className="text-gray-600 mt-2">{achievement.description}</p>
              <div className="mt-4 flex space-x-4">
                {achievement.certificate && (
                  <a href={achievement.certificate} className="text-violet-500 hover:underline">
                    Certificate
                  </a>
                )}
                {achievement.link && (
                  <a href={achievement.link} className="text-violet-500 hover:underline">
                    Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-violet-700 mb-6">Courses</h2>
        
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="flex items-start space-x-4 hover:bg-violet-100 p-4 rounded-lg transition duration-300 transform hover:scale-105">
              <div className="w-8 h-8 flex items-center justify-center bg-violet-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm1 3.59V10h4.59a1 1 0 110 2H11v4.59a1 1 0 11-2 0V12H4.41a1 1 0 110-2H9V5.41a1 1 0 112 0z"/>
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{course.title}</p>
                <a href={course.certificate} className="text-violet-500 hover:underline block mt-1">
                  Show credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  } else if (userType === "recruiter" && !recruiterIsFetching && !recruiterError) {
    content = 
    <div className="bg-gray-100 min-h-screen w-screen font-sans">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
        
        <div className="bg-violet-600 rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-xl font-semibold mb-2 text-white">Applicant Tracking System</h2>
        <p className="text-gray-300 text-sm mb-4">
          Manage your hiring process efficiently with our advanced ATS solution.
        </p>
        <p className="text-gray-300 text-lg font-semibold mb-4">
          {ats}
        </p>
        <div className="flex items-center">
          <div className="bg-violet-700 text-white rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-white text-xs">Learn More</p>
        </div>
      </div>

      <div className="bg-violet-600 rounded-lg shadow-lg p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Available Roles</h2>
        <p className="text-white font-semibold text-xs">Open Positions</p>
      </div>
      <p className="text-gray-300 text-sm mb-6">
        Explore our diverse range of job roles and join our talented team.
      </p>
      {seeAllRoles ? <div className="flex flex-wrap gap-2">
      {roles.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="bg-white text-violet-600 px-3 py-1 rounded-full text-sm font-semibold"
        >
          {tag}
        </span>
      ))}
      </div> : 
      <div className="flex flex-wrap gap-2">
      {roles.map((tag, index) => (
        <span
          key={index}
          className="bg-white text-violet-600 px-3 py-1 rounded-full text-sm font-semibold"
        >
          {tag}
        </span>
      ))}
    </div>}
      <div className="mt-6">
        <div
          onClick={() => setSeeAllRoles(!seeAllRoles)}
          className="text-violet-100 font-semibold text-sm hover:text-violet-200 transition pointer select-none"
        >
          {!seeAllRoles ? "View All Roles" : "View Less Roles"}
        </div>
      </div>
    </div>

      <div className="bg-violet-600 rounded-lg shadow-lg p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Recruitment Funding</h2>
      </div>
      <p className="text-gray-300 text-sm mb-6">
        Secure the resources you need to find and hire the best talent for your organization.
      </p>
      <div className="bg-white p-4 rounded-lg flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-14 w-14 rounded-full border-2 border-violet-600"
            src={process.env.PUBLIC_URL+"/img/recruitment-fund-icon.png"}
            alt="Recruitment Fund"
          />
        </div>
        <div className="ml-4">
          <p className="text-violet-600 text-lg font-semibold">Recruitment Funds</p>
          <p className="text-gray-600 text-sm">{fund}</p>
        </div>
      </div>
      <div className="mt-6">
        <a
          href="#"
          className="text-violet-100 font-semibold text-sm hover:text-violet-200 transition"
        >
          Learn More
        </a>
      </div>
    </div>


      </div>
    </div>
  }

  let header;
  if (userType === "applicant" && !applicantIsFetching && !applicantError) {
  header = 
  <div className="py-16 bg-gray-100 max-w-7xl mx-auto p-3 sm:p-6">
  <div className="p-3 sm:p-6 bg-white shadow mt-24 relative">
    <div style={rightTopHalfBorder}></div>
    <div style={rightBottomHalfBorder}></div>
    <div style={leftBottomHalfBorder}></div>
    <div style={bottomleftBottomHalfBorder}></div>
    <div style={toprightTopHalfBorder}></div>
    <div style={topLeftHalfBorder}></div>
    <div style={bottomrightTopHalfBorder}></div>
    <div style={lefttoprightTopHalfBorder}></div>
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="grid grid-cols-2 text-center order-last md:order-first mt-10 md:mt-0">
        <div>
        <button
    className="hidden sm:block text-white py-2 px-4 uppercase rounded bg-indigo-400 hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
  >
    Message
  </button>
        </div>
      </div>
      <div className="relative">
        <img src={applicantImage} alt={applicantName} className="w-36 h-36 mx-auto sm:w-48 sm:h-48 border-4 border-violet-300 rounded-full object-cover absolute inset-x-0 top-0 -mt-24 flex items-center justify-center" />
      </div>
  
      <div className="space-x-8 flex justify-between mt-16 sm:mt-32 md:mt-0 md:justify-center">
  <button
    className="text-white py-2 px-4 uppercase rounded bg-violet-400 hover:bg-violet-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    onClick={handleShowJobApplicantForm}
  >
    Edit Profile
  </button>
      <button
    className="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    onClick={handleLogout}
  >
    Log out
  </button>
      </div>
    </div>
  
    <div className="mt-0 sm:mt-20 text-center border-b pb-8 sm:pb-12">
      <div className='flex space-x-4 justify-center'>
        <h1 className="text-3xl sm:text-4xl font-medium text-gray-700">{applicantName}</h1>
        <p className="py-2 px-4 text-gray-500 bg-violet-200 rounded-full">{applicantId[0].username}</p>
      </div>
      <button
        className="text-white sm:hidden mx-auto mt-6 py-2 px-4 uppercase rounded bg-indigo-400 hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
      >
        Message
      </button>
  
      <p className="mt-8 hidden sm:block text-gray-500">{experience[0].title} - {experience[0].companyName}</p>
      <p className="mt-8 block sm:hidden text-gray-500">{experience[0].title}</p>
      <p className="block sm:hidden font-bold text-gray-500">{experience[0].companyName}</p>
      <p className="mt-8 sm:mt-2 text-gray-500">{education[0].institutionName}</p>
    </div>
  
    <div className="mt-8 sm:mt-12 flex flex-col space-y-6 justify-center">
      <p className="text-gray-600 text-center font-light lg:px-16">{headline}</p>
      <p className="text-gray-600 text-center font-light lg:px-16"><span className="font-semibold">Email : </span>{applicantId[0].email}</p>
    </div>
  
  </div>
  </div>
  } else if (userType === "recruiter" && !recruiterIsFetching && !recruiterError) {
    header = 
    <div className="py-16 bg-gray-100 max-w-7xl mx-auto p-3 sm:p-6">
    <div className="p-3 sm:p-6 bg-violet-600 shadow mt-24 relative">
      <div style={rightTopHalfBorder}></div>
      <div style={rightBottomHalfBorder}></div>
      <div style={leftBottomHalfBorder}></div>
      <div style={bottomleftBottomHalfBorder}></div>
      <div style={toprightTopHalfBorder}></div>
      <div style={topLeftHalfBorder}></div>
      <div style={bottomrightTopHalfBorder}></div>
      <div style={lefttoprightTopHalfBorder}></div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
          <div>
          <button
      className="hidden sm:block text-white py-2 px-4 uppercase rounded bg-indigo-400 hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      Message
    </button>
          </div>
        </div>
        <div className="relative">
          <img src={recruiterImage} alt={recruiterName} className="w-36 h-36 mx-auto sm:w-48 sm:h-48 border-4 border-violet-300 rounded-full object-cover absolute inset-x-0 top-0 -mt-24 flex items-center justify-center" />
        </div>
    
        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
    <button
      onClick={handleShowRecruiterForm}
      className="text-white py-2 px-4 uppercase rounded bg-violet-400 hover:bg-violet-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      Edit Profile
    </button>
        <button
      className="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
      onClick={handleLogout}
    >
      Log out
    </button>
        </div>
      </div>
    
      <div className="mt-0 sm:mt-20 text-center border-b pb-12">
        <div className='flex space-x-4 justify-center'>
          <h1 className="text-3xl sm:text-4xl font-medium text-white">{recruiterName}</h1>
          <p className="py-2 px-4 text-gray-500 bg-violet-200 rounded-full">{recruiterId.username}</p>
        </div>
        <button
          className="text-white sm:hidden mx-auto mt-6 py-2 px-4 uppercase rounded bg-indigo-400 hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
        >
          Message
        </button>
      </div>
    
      <div className="mt-12 flex flex-col space-y-6 justify-center">
        <p className="text-gray-200 text-center font-light lg:px-16">{bio}</p>
        <p className="text-gray-200 text-center font-light lg:px-16"><span className="font-semibold">Email : </span>{contactEmail}</p>
      </div>
    
    </div>
    </div>
    }

  return (
    <div className='bg-gray-100'>
      {showJobApplicantForm ? <UpdateApplicantDetailsForm handleShowJobApplicantForm={handleShowJobApplicantForm} data={{currId: applicant_id, currName: applicantName, currImageUrl: applicantImage, currHeadline: headline, education, skills, experience, projects, achievements, courses}} /> : <></>}
      {showRecruiterForm ? <UpdateRecruiterDetailsForm handleShowRecruiterForm={handleShowRecruiterForm} data={{currId: recruiter_id,currName: recruiterName, currImageUrl: recruiterImage, currContactEmail: contactEmail, currBio: bio, currAts: ats, currRoles: roles, currFund: fund}} /> : <></>}
      {header}
      {content}
    </div> 
  );
};

export default ProfilePage;
