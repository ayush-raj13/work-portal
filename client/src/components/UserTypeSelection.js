import axios from "axios";
import Button from "./Button";
import useNavigation from "../hooks/use-navigation";

function UserTypeSelection() {
  const { navigate } = useNavigation();

  const setApplicant = async () => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/type/applicant`, {}, { withCredentials: true });
      if (res.data.type === "applicant") {
        navigate("/applicant-form");
      }
    } catch {
      alert("Error!");
    }
  }

  const setRecruiter = async () => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/type/recruiter`, {}, { withCredentials: true });
      if (res.data.type === "recruiter") {
        navigate("/recruiter-form");
      }
    } catch {
      alert("Error!");
    }
  }

  return (
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth:"1000px"}}>
      <div className="flex flex-col sm:flex-row justify-around space-y-14 sm:space-y-0 py-8 sm:py-16">
        <div className="flex flex-col space-y-8 items-center">
          <img className="w-36 sm:h-48 lg:h-64 sm:w-full" src={process.env.PUBLIC_URL+ "/img/find-jobs.png"} alt="find-jobs" />
          <Button onClick={setApplicant} className="text-white font-semibold rounded-2xl bg-violet-700 hover:bg-violet-900 hover:-translate-y-1 hover:shadow-xl shadow-slate-900 transition duration-300 mx-auto py-2 px-4 sm:py-4 sm:px-8">Find Jobs</Button>
        </div>
        <div className="flex flex-col space-y-8 items-center">
          <img className="w-36 sm:h-48 lg:h-64 sm:w-full" src={process.env.PUBLIC_URL+ "/img/hring.png"} alt="hiring" />
          <Button onClick={setRecruiter} className="text-white font-semibold rounded-2xl bg-violet-700 hover:bg-violet-900 hover:-translate-y-1 hover:shadow-xl shadow-slate-900 transition duration-300 mx-auto py-2 px-4 sm:py-4 sm:px-8">Hire Staff</Button>
        </div>
      </div>
    </div>
  );
}

export default UserTypeSelection;