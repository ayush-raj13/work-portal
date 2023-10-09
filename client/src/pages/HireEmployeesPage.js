import Wave from "react-wavify";
import Footer from "../components/Footer";
import Button from "../components/Button";
import UserDrawerSidePanel from "../components/UserDrawerSidePanel";
import { useState } from "react";
import Modal from "../components/Modal";
import { HiOutlineSearch } from "react-icons/hi";
import { TbUserSearch } from "react-icons/tb";
import { FiAlignCenter } from "react-icons/fi";
import JobApplicantList from "../components/JobApplicantList";

function HireEmployeesPage() {
  const [keyword, setKeyword] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [resetJobApplicantList, setResetJobApplicantList] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  const handleSearch = () => {
    const changedFilter = {
      ...filter,
      keyword,
      name,
      page: 1
    };
    if (JSON.stringify(changedFilter) !== JSON.stringify(filter)) {
      setResetJobApplicantList(true);
    }
    setFilter(changedFilter);
  }

  const handleModalClick = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    let sort = sortOption;
      if (sortOrder === "decreasing") {
        sort = `-${sortOption}`
      }
      let changedFilter = {
        ...filter,
        institutionName,
        companyName,
        sort,
        page: 1
      };
      if (startYear !== 0) {
        changedFilter.startYear = startYear;
      }
      
      if (endYear !== 0) {
        changedFilter.endYear = endYear;
      }

      if (startYear === 0) {
        delete changedFilter.startYear;
      }

      if (endYear === 0) {
        delete changedFilter.endYear;
      }


      if (startDate !== 0) {
        changedFilter.startDate = startDate;
      }
      
      if (endDate !== 0) {
        changedFilter.endDate = endDate;
      }

      if (startDate === 0) {
        delete changedFilter.startDate;
      }

      if (endDate === 0) {
        delete changedFilter.endDate;
      }
      if (JSON.stringify(changedFilter) !== JSON.stringify(filter)) {
        setResetJobApplicantList(true);
      }
      setFilter(changedFilter);
      setShowModal(false);
  }

  const handleModalReset = () => {
    setInstitutionName('');
    setStartYear(0);
    setEndYear(0);
    setCompanyName('');
    setStartDate('');
    setEndDate('');
    setSortOption('');
    setSortOrder('');
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  }

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  }

  const handleInstitutionNameChange = (event) => {
    setInstitutionName(event.target.value);
  }

  const handleStartYearChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setStartYear(value);
  }

  const handleEndYearChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setEndYear(value);
  }

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  }

  const handleStartDateChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setStartDate(value);
  }

  const handleEndDateChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setEndDate(value);
  }

  const modal = <Modal onClose={handleModalClose} actionBar={<div className="flex space-x-3"><Button success onClick={handleModalReset} className="text-white font-thin text-md sm:text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-green-800 transition duration-200">Clear</Button><Button onClick={handleModalClose} primary className="text-white font-thin text-md sm:text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-blue-800 transition duration-200">Submit</Button></div>}>
     <div className="flex flex-col gap-2 sm:gap-6 p-2 sm:p-6 bg-gray-100 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 text-base sm:text-lg font-semibold">School/Organization:</label>
          <div className="flex flex-col gap-2">
            <label className="block text-sm sm:text-base text-gray-700">Name</label>
            <input value={institutionName} onChange={handleInstitutionNameChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="text" placeholder="Institution Name" />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <label className="block text-sm sm:text-base text-gray-700">Start Year</label>
              <input value={startYear || ''} onChange={handleStartYearChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="number" placeholder="Start Year" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm sm:text-base text-gray-700">End Year</label>
              <input value={endYear || ''} onChange={handleEndYearChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="number" placeholder="End Year" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 text-base sm:text-lg font-semibold">Company:</label>
          <div className="flex flex-col gap-2">
            <label className="block text-sm sm:text-base text-gray-700">Name</label>
            <input value={companyName} onChange={handleCompanyNameChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="text" placeholder="Company Name" />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <label className="block text-sm sm:text-base text-gray-700">Start Date</label>
              <input value={startDate || ''} onChange={handleStartDateChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="number" placeholder="Start Year" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm sm:text-base text-gray-700">End Date</label>
              <input value={endDate || ''} onChange={handleEndDateChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base" type="number" placeholder="End Year" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <span className="text-lg font-semibold text-gray-800">Sort:</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center text-base text-gray-700">
            <input
              type="checkbox"
              value="monthsOfExperience"
              checked={sortOption === 'monthsOfExperience'}
              onChange={handleSortOptionChange}
              className="mr-2 text-blue-500 focus:ring focus:ring-blue-300"
            />
            <span className="text-sm sm:text-base">Experience</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <span className="text-lg font-semibold text-gray-800">Sort Order:</span>
        <div className="flex gap-4">
          <label className="flex items-center text-base text-gray-700">
            <input
              type="radio"
              name="sortOrder"
              value="increasing"
              checked={sortOrder === 'increasing'}
              onChange={handleSortOrderChange}
              className="mr-2 text-blue-500 focus:ring focus:ring-blue-300"
            />
            <span className="text-sm sm:text-base">Increasing</span>
          </label>
          <label className="flex items-center text-base text-gray-700">
            <input
              type="radio"
              name="sortOrder"
              value="decreasing"
              checked={sortOrder === 'decreasing'}
              onChange={handleSortOrderChange}
              className="mr-2 text-blue-500 focus:ring focus:ring-blue-300"
            />
            <span className="text-sm sm:text-base">Decreasing</span>
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
          <div className="font-barlow-condensed text-xl sm:text-2xl lg:text-4xl  text-[#D0D6F9] tracking-widest leading-[19.2px] sm:leading-6 lg:leading-[33.6px]">Discover the Perfect Fit</div>
          <div className="flex bg-white p-2 rounded-r-full rounded-l-full border-[1px] border-black">
            <label className="relative rounded-l-full w-[30%] focus-within:text-gray-600 block">
            <HiOutlineSearch className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-2 lg:left-3" />
            <input type="text" placeholder="Keyword" value={keyword} onChange={handleKeywordChange} className="ml-4 sm:ml-8 lg:ml-12 rounded-l-full w-full placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 border-r-[1px] placeholder-black focus:placeholder-gray-600" />
            </label>
            <label className="relative w-[70%] focus-within:text-gray-600 block">
            <TbUserSearch className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-[18px] sm:left-[36px] lg:left-[52px]" />
            <input type="text" placeholder="Search User" value={name} onChange={handleNameChange} className="ml-[25px] sm:ml-[54px] lg:ml-[84px] w-[84%] sm:w-[84%] lg:w-[86%] placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 placeholder-black focus:placeholder-gray-600" />
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
      <JobApplicantList filter={filter} setFilter={setFilter} resetJobApplicantList={resetJobApplicantList} setResetJobApplicantList={setResetJobApplicantList} />
      <Footer />
    </div>
  );
}

export default HireEmployeesPage;