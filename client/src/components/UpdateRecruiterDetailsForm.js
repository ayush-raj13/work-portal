import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useUpdateRecruiterMutation } from '../store';

const UpdateRecruiterDetailsForm = ({ data, handleShowRecruiterForm }) => {
  const [updateRecruiter, { isLoading, isError }] = useUpdateRecruiterMutation();
  const { currId, currName, currImageUrl, currContactEmail, currBio, currAts, currRoles, currFund } = data;
  const [name, setName] = useState(currName);
  const [image, setImage] = useState('');
  const [contactEmail, setContactEmail] = useState(currContactEmail);
  const [bio, setBio] = useState(currBio);
  const [ats, setAts] = useState(currAts);
  const [roles, setRoles] = useState(currRoles);
  const [fund, setFund] = useState(currFund);

  useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'ats1', text: 'ATS 1'},
    {value: 'ats2', text: 'ATS 2'},
    {value: 'ats3', text: 'ATS 3'},
    {value: 'Jobvite', text: 'Jobvite'},
  ];

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleContactEmailChange = (event) => {
    setContactEmail(event.target.value);
  }

  const handleBioChange = (event) => {
    setBio(event.target.value);
  }

  const handleAtsChange = (event) => {
    setAts(event.target.value);
  }

  const handleRolesChange = (event) => {
    const newRoles = event.target.value.split(',');
    setRoles(newRoles);
  }

  const handleFundChange = (event) => {
    setFund(event.target.value);
  }

  const handleSubmit = async (event) => {
    let imageUrl = currImageUrl;
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhoysx4vk/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'work-portal';

    if (image !== "") {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        await axios({
          url: CLOUDINARY_URL,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: formData
        }).then((res) => {
          imageUrl = res.data.secure_url;
        });
      } catch (err) {
        alert("Error in uploading image!");
        throw err; // Throw the error to be caught by the outer try-catch
      }
    }

    const roleList = roles.map(function (el) {
      return el.trim();
    });

    try {
      await updateRecruiter({id: currId, name, image: imageUrl, contactEmail, bio, ats, roles: roleList, fund});
      if (isError) alert("Error updating details");
      handleShowRecruiterForm();
    } catch {
      alert("Error!");
    }
  }

  return (
  <div className="w-screen h-screen bg-gray-700 bg-opacity-70 fixed inset-0 z-20 overflow-hidden">
    <div className="max-w-md mx-auto mt-8 p-6 bg-violet-200 shadow-md rounded-md relative">
      <div onClick={handleShowRecruiterForm} className='absolute top-4 right-4'><RxCross2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-700 hover:scale-125 transition" /></div>
      <h2 className="text-2xl font-bold mb-6 text-violet-700">Update Form</h2>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          name="name"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="image">
          Upload Image
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="contactEmail">
          Contact Email
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="email"
          id="contactEmail"
          value={contactEmail}
          onChange={handleContactEmailChange}
          name="contactEmail"
          placeholder="Enter your contact email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="w-full h-20 px-3 py-2 resize-none bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          id="bio"
          value={bio}
          onChange={handleBioChange}
          name="bio"
          placeholder="Write a short bio..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="ats">
          ATS (Applicant Tracking System)
        </label>
        <select
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          id="ats"
          name="ats"
          value={ats}
          onChange={handleAtsChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
          {/* Add more options if needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="roles">
          Roles (comma-separated)
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="roles"
          name="roles"
          placeholder="e.g., Developer, Designer, Manager"
          value={roles}
          onChange={handleRolesChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="fund">
          Fund
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="fund"
          name="fund"
          placeholder="Enter the fund"
          value={fund}
          onChange={handleFundChange}
        />
      </div>
      <button
        className={`w-full ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700"
        } text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring ${
          isLoading ? "" : "focus:ring-violet-300 focus:border-violet-500"
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

export default UpdateRecruiterDetailsForm;
