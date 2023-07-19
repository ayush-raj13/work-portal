import JobCard from "./JobCard";
import { useFetchJobsQuery } from "../store";
import Skeleton from "./Skeleton";

function JobList({ filter }) {
  const { data, error, isFetching } = useFetchJobsQuery(filter);
  console.log(useFetchJobsQuery())

  let content;
  if (isFetching) {
    content = <Skeleton className="h-56 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = (data.jobs).map((job) => {
      return <JobCard key={job._id} job={job} />;
    });
  }

  return (
    <div className="relative -top-48 flex flex-col space-y-8 w-screen min-h-screen bg-white">
      {content}
    </div>
  )
}

export default JobList