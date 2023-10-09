import { FiMessageCircle } from "react-icons/fi";

function JobApplicantCard({ jobApplicant }) {
  const { name,
  applicantId,
  image,
  monthsOfExperience,
  headline } = jobApplicant;

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const experience = monthsOfExperience < 12 ? monthsOfExperience + " months of experience" : round(monthsOfExperience/12.0, 1) + " years of experience";
  return (
    <div className="h-80 relative overflow-hidden bg-purple-600 rounded-md mb-2.5 shadow-md">
      <div className="h-1/2 bg-purple-500 flex items-center justify-center">
        <img
          src={ image }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>
      <div className="p-4 text-white">
        <h2 className="text-lg font-semibold">{ name }</h2>
        <p className="text-sm bg-violet-800 inline-block py-1 px-[6px] rounded-full">{ applicantId[0].username }</p>
        <p className="text-sm">{ headline }</p>
      </div>
      <div className="bg-purple-500 p-2 text-center absolute bottom-0 left-0 right-0 rounded-b-md">
        <p className="text-xs sm:text-sm text-white">{ experience }</p>
      </div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <button className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500 hover:bg-indigo-700">
          <FiMessageCircle className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
}

export default JobApplicantCard;
