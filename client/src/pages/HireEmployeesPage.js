import Wave from "react-wavify";
import Footer from "../components/Footer";
import Button from "../components/Button";
import UserDrawerSidePanel from "../components/UserDrawerSidePanel";
import { useState } from "react";
import Modal from "../components/Modal";
import { HiOutlineSearch } from "react-icons/hi";
import { TbUserSearch } from "react-icons/tb";
import { FiAlignCenter } from "react-icons/fi";

function HireEmployeesPage() {
  const [keyword, setKeyword] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {

  }

  const handleModalClick = () => {

  }

  const handleModalClose = () => {

  }

  const handleModalReset = () => {

  }

  const handleKeywordChange = () => {

  }

  const handleNameChange = () => {

  }

  const modal = <Modal onClose={handleModalClose} actionBar={<div className="flex space-x-3"><Button success onClick={handleModalReset} className="text-white font-thin text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-green-800 transition duration-200">Clear</Button><Button onClick={handleModalClose} primary className="text-white font-thin text-xl rounded-lg hover:font-extralight hover:scale-110 hover:shadow-inner hover:bg-blue-800 transition duration-200">Submit</Button></div>}></Modal>

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
          <div className="font-barlow-condensed text-xl sm:text-2xl lg:text-4xl  text-[#D0D6F9] tracking-widest leading-[19.2px] sm:leading-6 lg:leading-[33.6px]">Find Your Dream Jobs Here</div>
          <div className="flex bg-white p-2 rounded-r-full rounded-l-full border-[1px] border-black">
            <label className="relative rounded-l-full w-[30%] focus-within:text-gray-600 block">
            <HiOutlineSearch className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-2 lg:left-3" />
            <input type="text" placeholder="Keyword" value={keyword} onChange={handleKeywordChange} className="ml-4 sm:ml-8 lg:ml-12 rounded-l-full w-full placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 border-r-[1px] placeholder-black focus:placeholder-gray-600" />
            </label>
            <label className="relative w-[70%] focus-within:text-gray-600 block">
            <TbUserSearch className="pointer-events-none w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 absolute top-1/2 transform -translate-y-1/2 left-5 sm:left-[36px] lg:left-[52px]" />
            <input type="text" placeholder="Search User" value={name} onChange={handleNameChange} className="ml-[28px] sm:ml-[54px] lg:ml-[84px] w-[84%] sm:w-[84%] lg:w-[86%] placeholder-text-xs sm:placeholder-text-xl lg:placeholder-text-2xl text-xs sm:text-xl lg:text-2xl sm:p-2 focus:ring-0 border-0 placeholder-black focus:placeholder-gray-600" />
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

      <Footer />
    </div>
  );
}

export default HireEmployeesPage;