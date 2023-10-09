import axios from "axios";
import { BiSolidUserCircle } from "react-icons/bi";
import useAuthTokenContext from "../hooks/use-auth-token";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import Link from "./Link";
import useNavigation from "../hooks/use-navigation";

function UserDrawerSidePanel() {
  const { authToken } = useAuthTokenContext();
  const { navigate, currentPath } = useNavigation();

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const divEl = useRef();

  const cookies = new Cookies();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return
      };
      
      if (!divEl.current.contains(event.target)) {
        setShowDropdownMenu(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleShowDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/logout`, { withCredentials: true });
      if (res.data.done) {
        cookies.remove('connect.sid', { path: '/' });
        cookies.remove('user', { path: '/' });
        setShowDropdownMenu(false);
        if (currentPath !== "/") {
          navigate("/");
        }
      }
    } catch {
      alert("Error logging out!");
    }
  }

  const dropdownMenu = 
  <div className="absolute top-10 right-4 sm:top-14 sm:right-3 z-10 mt-2 w-24 sm:w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
            {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
            {!authToken && <Link to="/login" className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-xs sm:text-sm">Login</Link>}
            {!authToken && <Link to="/register" className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-xs sm:text-sm">Register</Link>}
            {authToken && <Link to="/profile" className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-xs sm:text-sm">Profile</Link>}
            {authToken && <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-200 block w-full px-4 py-2 text-left text-xs sm:text-sm">Sign out</button>}
        </div>
  </div>

  return (
    <div ref={divEl}>
      <div onClick={handleShowDropdownMenu} className="absolute top-4 right-4 sm:top-2 sm:right-3 text-white hover:scale-110 transition duration-200 opacity-70 hover:opacity-100">
        <BiSolidUserCircle className="w-6 h-6 sm:w-12 sm:h-12" />
      </div>

      {showDropdownMenu && dropdownMenu}
    </div>
  );
}

export default UserDrawerSidePanel;