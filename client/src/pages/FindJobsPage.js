import Button from "../components/Button"
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiAlignCenter } from "react-icons/fi";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import Wave from "react-wavify";
import { useState } from "react";
import JobList from "../components/JobList";
import UserDrawerSidePanel from "../components/UserDrawerSidePanel";
import MultiRangeSlider from "../components/multiRangeSlider/multiRangeSlider";

function FindJobsPage() {
  const [showModal, setShowModal] = useState(false);
  const [jobType, setJobType] = useState('');
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(1000000);
  const [minExperience, setMinExperience] = useState(0);
  const [duration, setDuration] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filter, setFilter] = useState({});
  const [resetJobList, setResetJobList] = useState(false);
  const [showRecommendedJobs, setShowRecommendedJobs] = useState(true);

  const handleRecommendedJobsChange = () => {
    setShowRecommendedJobs(!showRecommendedJobs);
  }

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleModalClick = () => {
      setShowModal(true);
  };

  const handleModalClose = () => {
    let sort = sortOption;
      if (sortOrder === "decreasing" && sortOption !== "") {
        sort = `-${sortOption}`
      }
      let changedFilter = {
        ...filter,
        jobType,
        minSalary,
        maxSalary,
        minExperience,
        minDuration: 0,
        sort,
        page: 1
      };
      if (!!duration && duration.value !== -1) {
        changedFilter.maxDuration = duration.value;
      }
      if (!!duration && duration.value === -1) {
        const { maxDuration, ...rest } = changedFilter
        changedFilter = rest;
        changedFilter.minDuration = 24;
      }
      if (JSON.stringify(changedFilter) !== JSON.stringify(filter)) {
        setResetJobList(true);
      }
      setFilter(changedFilter);
      setShowModal(false);
  };

  const handleModalReset = () => {
    setJobType('');
    setMinSalary(0);
    setMaxSalary(1000000);
    setDuration(null);
    setSortOption('');
    setSortOrder('');
    setMinExperience(0);
  }

  const handleDurationChange = (option) => {
    setDuration(option);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMinExperienceChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setMinExperience(value);
  }

  const handleSearch = () => {
    const changedFilter = {
      ...filter,
      keyword,
      location,
      page: 1
    };
    if (JSON.stringify(changedFilter) !== JSON.stringify(filter)) {
      setResetJobList(true);
    }
    setFilter(changedFilter);
  };

  const options = [
    { label: 'less than or equal to 3 months', value: 3 },
    { label: 'less than or equal to 6 months', value: 6 },
    { label: 'less than or equal to 12 months', value: 12 },
    { label: 'less than or equal to 24 months', value: 24 },
    { label: 'greater than 24 months', value: -1 },
  ];

  const modal = <Modal onClose={handleModalClose} actionBar={<div className="flex space-x-3"><Button success onClick={handleModalReset} className="text-white font-thin text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-green-800 transition duration-200">Clear</Button><Button onClick={handleModalClose} primary className="text-white font-thin text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-blue-800 transition duration-200">Submit</Button></div>}>
     <div className="flex flex-col gap-2 sm:gap-6 p-2 sm:p-6 bg-gray-100 rounded-lg">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Job Type:</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Full Time"
              checked={jobType === 'Full Time'}
              onChange={handleJobTypeChange}
              className="mr-1"
            />
            Full Time
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Part Time"
              checked={jobType === 'Part Time'}
              onChange={handleJobTypeChange}
              className="mr-1"
            />
            Part Time
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Work From Home"
              checked={jobType === 'Work From Home'}
              onChange={handleJobTypeChange}
              className="mr-1"
            />
            Work From Home
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Internship"
              checked={jobType === 'Internship'}
              onChange={handleJobTypeChange}
              className="mr-1"
            />
            Internship
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Trainee"
              checked={jobType === 'Trainee'}
              onChange={handleJobTypeChange}
              className="mr-1"
            />
            Trainee
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Salary:</span>
        <MultiRangeSlider
          min={minSalary}
          max={maxSalary}
          onChange={({ min, max }) => {setMaxSalary(max); setMinSalary(min);}}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block text-sm sm:text-base text-gray-700">Minimum Experience</label>
        <input value={minExperience || ''} onChange={handleMinExperienceChange} className="w-48 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="number" placeholder="Experience" />
      </div>

      <div className="flex flex-col gap-2">
      <span className="text-lg font-semibold">Duration:</span>
      <Dropdown options={options} value={duration} onChange={handleDurationChange} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Sort:</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="salary"
              checked={sortOption === 'salary'}
              onChange={handleSortOptionChange}
              className="mr-1"
            />
            Salary
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="duration"
              checked={sortOption === 'duration'}
              onChange={handleSortOptionChange}
              className="mr-1"
            />
            Duration
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="dateOfPosting"
              checked={sortOption === 'dateOfPosting'}
              onChange={handleSortOptionChange}
              className="mr-1"
            />
            Date of Posting
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="experience"
              checked={sortOption === 'experience'}
              onChange={handleSortOptionChange}
              className="mr-1"
            />
            Experience
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Sort Order:</span>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOrder"
              value="increasing"
              checked={sortOrder === 'increasing'}
              onChange={handleSortOrderChange}
              className="mr-1"
            />
            Increasing
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOrder"
              value="decreasing"
              checked={sortOrder === 'decreasing'}
              onChange={handleSortOrderChange}
              className="mr-1"
            />
            Decreasing
          </label>
        </div>
      </div>
    </div> 
  </Modal>
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen scroll-smooth">
      <UserDrawerSidePanel />
      <div 
        className="flex flex-col space-y-5 sm:space-y-8 justify-center items-center w-screen bg-no-repeat bg-cover bg-center pb-40"
        style={{
          backgroundImage:`url(${process.env.PUBLIC_URL+ "/img/color-smoke-abstract-wallpaper-aesthetic-background-design.jpg"})`
        }}
      >
        {/* SearchBar */}
        <div className="flex flex-col space-y-8  w-[85%] sm:w-[80%] mt-36">
          <div className="flex flex-col space-y-6 sm:flex-row justify-between">  
            <div className="font-barlow-condensed text-xl sm:text-2xl lg:text-4xl  text-[#D0D6F9] tracking-widest leading-[19.2px] sm:leading-6 lg:leading-[33.6px]">Find Your Dream Jobs Here</div>
            <div className="flex space-x-2 justify-end sm:justify-start items-center">
              <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer text-[#D0D6F9] text-xs sm:text-lg lg:text-xl font-semibold"
                  htmlFor="flexSwitchChecked"
              >{showRecommendedJobs ? 'Recommended Jobs' : 'All Jobs'}</label>
              <div
                className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
                onClick={handleRecommendedJobsChange}
              >
                {/* Switch */}
                <div
                  className={
                    "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                    (showRecommendedJobs ? null : " transform translate-x-5")
                  }
                ></div>
              </div>
            </div>
          </div>
          <div className="flex bg-white p-2 rounded-r-full rounded-l-full border-[1px] border-black">
            <label className="relative rounded-l-full w-[30%] focus-within:text-gray-600 block">
            <HiOutlineSearch className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-2 lg:left-3" />
            <input type="text" placeholder="Keyword" value={keyword} onChange={handleKeywordChange} className="ml-4 sm:ml-8 lg:ml-12 rounded-l-full w-full placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 border-r-[1px] placeholder-black focus:placeholder-gray-600" />
            </label>
            <label className="relative w-[70%] focus-within:text-gray-600 block">
            <HiOutlineLocationMarker className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-[18px] sm:left-[36px] lg:left-[52px]" />
            <input type="text" placeholder="Add Country or City" value={location} onChange={handleLocationChange} className="ml-[25px] sm:ml-[54px] lg:ml-[84px] w-[84%] sm:w-[84%] lg:w-[86%] placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 placeholder-black focus:placeholder-gray-600" />
            </label>
            <Button onClick={handleSearch} className="rounded-full bg-violet-600 hover:shadow-inner hover:bg-violet-800 text-white px-4 sm:px-6 lg:px-8 text-xs sm:text-lg lg:text-xl font-semibold transition duration-200">Search</Button>
          </div>
        </div>
        <Button rounded onClick={handleModalClick} className="h-[42px] sm:h-[52px] lg:h-[60px] hover:scale-110 transition duration-200"><FiAlignCenter className="text-white w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" /></Button>
        {showModal && modal}
      </div>
      <Wave 
        className="relative -top-28 lg:-top-28"
        fill='#ffffff'
        paused={true}
        options={{
          height: 20,
          amplitude: 40,
          speed: 0.35,
          points: 2
        }}
      />
      <JobList filter={filter} setFilter={setFilter} resetJobList={resetJobList} setResetJobList={setResetJobList} showRecommendedJobs={showRecommendedJobs} />
      <Footer />
    </div>
  )
}

export default FindJobsPage