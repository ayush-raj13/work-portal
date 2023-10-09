import axios from 'axios';
import React, { useState } from 'react';
import useNavigation from '../hooks/use-navigation';

const ApplicantForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [skills, setSkills] = useState([]);
  const [educationFields, setEducationFields] = useState([{ institutionName: '', startYear: '', endYear: '' }]);

  const { navigate } = useNavigation();

  const handleAddEducation = () => {
    setEducationFields([...educationFields, { institutionName: '', startYear: '', endYear: '' }]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSkillsChange = (event) => {
    const newSkills = event.target.value.split(',');
    setSkills(newSkills);
  }

  const handleEducationChange = (index, field, value) => {
    const updatedFields = [...educationFields];
    if (field === "startYear" || field === "endYear") {
      value = parseInt(value) || 0
    }
    updatedFields[index][field] = value;
    setEducationFields(updatedFields);
  }

  const handleSubmit = async (event) => {
    let imageUrl = '';
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhoysx4vk/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'work-portal';

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then((res) => {
      imageUrl = res.data.secure_url;
    }).catch((err) => {
        alert("Error in uploading image!");
        return;
    });

    const skillList = skills.map(function (el) {
      return el.trim();
    });

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/jobapplicant`, {name, image: imageUrl, education: educationFields, skills: skillList}, {withCredentials: true});
      navigate("/find-jobs");
    } catch {
      alert("Error!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-violet-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-violet-700">Registration Form</h2>
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
        <label className="block text-violet-700 text-sm font-bold mb-2">Education</label>
        {educationFields.map((education, index) => (
          <div key={index} className="space-y-2 my-4">
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`institutionName_${index}`}
              placeholder="Institution Name"
              value={education.institutionName}
              onChange={(e) => handleEducationChange(index, 'institutionName', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="number"
                name={`startYear_${index}`}
                placeholder="Start Year"
                value={education.startYear || ''}
                onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
              />
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="number"
                name={`endYear_${index}`}
                placeholder="End Year"
                value={education.endYear || ''}
                onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          onClick={handleAddEducation}
        >
          Add Education
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="skills">
          Skills (separate with commas)
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="skills"
          value={skills}
          onChange={handleSkillsChange}
          name="skills"
          placeholder="e.g., HTML, CSS, JavaScript"
        />
      </div>
      <button
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ApplicantForm;
