import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useUpdateJobApplicantMutation } from '../store';
import moment from 'moment';

const UpdateApplicantDetailsForm = ({data, handleShowJobApplicantForm}) => {
  const [updateJobApplicant, { isLoading, isError }] = useUpdateJobApplicantMutation();
  const {currId, currName, currImageUrl, currHeadline, education, skills: currSkills, experience, projects, achievements, courses} = data;
  const [name, setName] = useState(currName);
  const [headline, setHeadline] = useState(currHeadline);
  const [image, setImage] = useState('');
  const [skills, setSkills] = useState(currSkills);
  const [educationFields, setEducationFields] = useState([{ institutionName: '', startYear: '', endYear: '' }]);
  const [experienceFields, setExperienceFields] = useState([{ title: '', employmentType: '', companyName: '', location: '', startDate: '', endDate: ''}]);
  const [projectFields, setProjectFields] = useState([{ title: '', description: '', demoLink: '', repositoryLink: ''}]);
  const [achievementFields, setAchievementFields] = useState([{ title: '', description: '', certificate: '', link: ''}]);
  const [courseFields, setCourseFields] = useState([{ title: '', certificate: ''}]);

  const options = [
    { value: "", label: "Employment Type" },
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Work From Home", label: "Work From Home" },
    { value: "Internship", label: "Internship" },
    { value: "Self Employed", label: "Self Employed" },
    { value: "Freelance", label: "Freelance" },
    { value: "Trainee", label: "Trainee" },
  ];
  
  useEffect(() => {
    if (education) {
      const updatedEducation = education.map((data) => {
        return {
          institutionName: data.institutionName,
          startYear: data.startYear,
          endYear: data.endYear
        };
      });
      setEducationFields(updatedEducation);
    }

    if (experience) {
      const updatedExperience = experience.map((data) => {
        return {
          title: data.title,
          employmentType: data.employmentType,
          companyName: data.companyName,
          location: data.location,
          startDate: data.startDate,
          endDate: data.endDate,
        };
      });
      setExperienceFields(updatedExperience);
    }

    if (projects) {
      const updatedProjects = projects.map((data) => {
        return {
          title: data.title,
          description: data.description,
          demoLink: data.demoLink,
          repositoryLink: data.repositoryLink,
        };
      });
      setProjectFields(updatedProjects);
    }

    if (achievements) {
      const updatedAchievements = achievements.map((data) => {
        return {
          title: data.title,
          description: data.description,
          certificate: data.certificate,
          link: data.link,
        };
      });
      setAchievementFields(updatedAchievements);
    }

    if (courses) {
      const updatedCourses = courses.map((data) => {
        return {
          title: data.title,
          certificate: data.certificate,
        };
      });
      setCourseFields(updatedCourses);
    }
  }, [education, experience, projects, achievements, courses]);

  useEffect(() => {
      document.body.classList.add('overflow-hidden');

      return () => {
          document.body.classList.remove('overflow-hidden');
      }
  }, []);

  const handleAddEducation = () => {
    setEducationFields([...educationFields, { institutionName: '', startYear: '', endYear: '' }]);
  };

  const handleAddExperience = () => {
    setExperienceFields([...experienceFields, { title: '', employmentType: '', companyName: '', location: '', startDate: '', endDate: ''}]);
  };

  const handleAddProject = () => {
    setProjectFields([...projectFields, { title: '', description: '', demoLink: '', repositoryLink: ''}]);
  };

  const handleAddAchievement = () => {
    setAchievementFields([...achievementFields, { title: '', description: '', certificate: '', link: ''}]);
  };

  const handleAddCourse = () => {
    setCourseFields([...courseFields, { title: '', certificate: ''}]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleHeadlineChange = (event) => {
    setHeadline(event.target.value);
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

  const handleExperienceChange = (index, field, value) => {
    const updatedFields = [...experienceFields];
    updatedFields[index][field] = value;
    setExperienceFields(updatedFields);
  }

  const handleProjectsChange = (index, field, value) => {
    const updatedFields = [...projectFields];
    updatedFields[index][field] = value;
    setProjectFields(updatedFields);
  }

  const handleAchievementsChange = (index, field, value) => {
    const updatedFields = [...achievementFields];
    updatedFields[index][field] = value;
    setAchievementFields(updatedFields);
  }

  const handleCoursesChange = (index, field, value) => {
    const updatedFields = [...courseFields];
    updatedFields[index][field] = value;
    setCourseFields(updatedFields);
  }

  const removeExperienceAtIndex = (indexToRemove) => {
    const updatedExperienceList = experienceFields.filter((experience, index) => {
      return index !== indexToRemove;
    });
  
    setExperienceFields(updatedExperienceList);
  }

  const removeEducationAtIndex = (indexToRemove) => {
    const updatedEducationList = educationFields.filter((education, index) => {
      return index !== indexToRemove;
    });
  
    setEducationFields(updatedEducationList);
  }

  const removeProjectAtIndex = (indexToRemove) => {
    const updatedProjectList = projectFields.filter((project, index) => {
      return index !== indexToRemove;
    });
  
    setProjectFields(updatedProjectList);
  }

  const removeAchievementAtIndex = (indexToRemove) => {
    const updatedAchievementList = achievementFields.filter((project, index) => {
      return index !== indexToRemove;
    });
  
    setAchievementFields(updatedAchievementList);
  }

  const removeCourseAtIndex = (indexToRemove) => {
    const updatedCourseList = courseFields.filter((course, index) => {
      return index !== indexToRemove;
    });
  
    setCourseFields(updatedCourseList);
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

    const skillList = skills.map(function (el) {
      return el.trim();
    });

    try {
      await updateJobApplicant({id: currId, name, headline, image: imageUrl, education: educationFields, experience: experienceFields, skills: skillList, projects: projectFields, achievements: achievementFields, courses: courseFields});
      if (isError) alert("Error updating details");
      handleShowJobApplicantForm();
    } catch {
      alert("Error!");
    }
  }

  return (
  <div className="w-screen h-screen bg-gray-700 bg-opacity-70 fixed inset-0 z-20 overflow-hidden">
    <div className="max-w-md h-[90%] mx-auto mt-8 p-6 bg-violet-200 shadow-md rounded-md relative overflow-y-auto">
      <div onClick={handleShowJobApplicantForm} className='absolute top-4 right-4'><RxCross2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-700 hover:scale-125 transition" /></div>
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
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="headline">
          Headline
        </label>
        <input
          className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          type="text"
          id="headline"
          value={headline}
          onChange={handleHeadlineChange}
          name="headline"
          placeholder="Enter a suitable headline"
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
            <button
              className="w-full text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => removeEducationAtIndex(index)}
            >
              Delete
            </button>
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
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2">Experience</label>
        {experienceFields.map((experience, index) => (
          <div key={index} className="space-y-2 my-4">
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`title_${index}`}
              placeholder="Job Title"
              value={experience.title}
              onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
            />

            {/* Dropdown for employmentType */}
            <div className="flex items-center space-x-2">
              <div className="relative inline-block text-left">
                <select
                  className="appearance-none bg-white rounded-md border border-violet-500 text-violet-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-violet-700 focus:ring"
                  value={experience.employmentType}
                  onChange={(e) => handleExperienceChange(index, 'employmentType', e.target.value)}
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-violet-700 bg-white hover:bg-violet-100"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="fill-current h-4 w-4 text-violet-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="text"
                name={`location_${index}`}
                placeholder="Location"
                value={experience.location}
                onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
              />
            </div>

            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`companyName_${index}`}
              placeholder="Company Name"
              value={experience.companyName}
              onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
              <label className="text-violet-600 mb-1">Start Date:</label>
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="date"
                name={`startDate_${index}`}
                placeholder="Start Date"
                value={moment(experience.startDate).format('YYYY-MM-DD')}
                onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
              />
              </div>
              <div>
              <label className="text-violet-600 mb-1">End Date:</label>
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="date"
                name={`endDate_${index}`}
                placeholder="End Date"
                value={moment(experience.endDate).format('YYYY-MM-DD')}
                onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
              />
              </div>
            </div>
            <button
              className="w-full text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => removeExperienceAtIndex(index)}
            >
              Delete
            </button>

          </div>
        ))}
        <button
          className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          onClick={handleAddExperience}
        >
          Add Experience
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2">Projects</label>
        {projectFields.map((project, index) => (
          <div key={index} className="space-y-2 my-4">
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`title_${index}`}
              placeholder="Title"
              value={project.title}
              onChange={(e) => handleProjectsChange(index, 'title', e.target.value)}
            />
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`description_${index}`}
              placeholder="Description"
              value={project.description}
              onChange={(e) => handleProjectsChange(index, 'description', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="text"
                name={`demoLink_${index}`}
                placeholder="Demo Link"
                value={project.demoLink}
                onChange={(e) => handleProjectsChange(index, 'demoLink', e.target.value)}
              />
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="text"
                name={`repositoryLink_${index}`}
                placeholder="Repository Link"
                value={project.repositoryLink}
                onChange={(e) => handleProjectsChange(index, 'repositoryLink', e.target.value)}
              />
            </div>
            <button
              className="w-full text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => removeProjectAtIndex(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2">Achievements</label>
        {achievementFields.map((achievement, index) => (
          <div key={index} className="space-y-2 my-4">
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`title_${index}`}
              placeholder="Title"
              value={achievement.title}
              onChange={(e) => handleAchievementsChange(index, 'title', e.target.value)}
            />
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`description_${index}`}
              placeholder="Description"
              value={achievement.description}
              onChange={(e) => handleAchievementsChange(index, 'description', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="text"
                name={`certificate_${index}`}
                placeholder="Certificate Link"
                value={achievement.certificate}
                onChange={(e) => handleAchievementsChange(index, 'certificate', e.target.value)}
              />
              <input
                className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
                type="text"
                name={`link_${index}`}
                placeholder="Link"
                value={achievement.link}
                onChange={(e) => handleAchievementsChange(index, 'link', e.target.value)}
              />
            </div>
            <button
              className="w-full text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => removeAchievementAtIndex(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          onClick={handleAddAchievement}
        >
          Add Achievement
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2">Courses</label>
        {courseFields.map((course, index) => (
          <div key={index} className="space-y-2 my-4">
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`title_${index}`}
              placeholder="Title"
              value={course.title}
              onChange={(e) => handleCoursesChange(index, 'title', e.target.value)}
            />
            <input
              className="w-full px-3 py-2 bg-white text-violet-800 placeholder-violet-400 border border-violet-600 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
              type="text"
              name={`certificate_${index}`}
              placeholder="Certificate"
              value={course.certificate}
              onChange={(e) => handleCoursesChange(index, 'certificate', e.target.value)}
            />
            <button
              className="w-full text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => removeCourseAtIndex(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="mt-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 focus:border-violet-500"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
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

export default UpdateApplicantDetailsForm;
