import JobCard from "./JobCard";
import { useFetchJobsQuery } from "../store";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";

function JobList({ filter, setFilter, resetJobList, setResetJobList }) {
  const [jobList, setJobList] = useState([]);
  const { data, error, isFetching } = useFetchJobsQuery(filter);

  useEffect(() => {
    if (resetJobList) {
      setJobList([]);
      setResetJobList(false);
    }
  },[resetJobList, setResetJobList]);

  useEffect(() => {
    if (typeof data !== "undefined") {
      document.documentElement.scrollTop -= 205;
      setJobList((prev) => [...prev, ...data.jobs]);
    } 
  }, [data]);

  useEffect(() => {
    const handleInfiniteScroll = async () => {
      try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight - 200
        ) {
          if (typeof data !== "undefined" && data.page !== -1) {
            setFilter({ ...filter, page: data.page})
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [data, filter, setFilter]);

  const content = (jobList).map((job) => {
    return <JobCard key={job._id} job={job} />;
  });

  return (
    <div className="relative -top-48 flex flex-col space-y-8 w-screen min-h-screen bg-white">
      {content}
      {isFetching && <Skeleton className="h-36 w-full" times={5} />}
      {error && <div>Error loading jobs.</div>}
    </div>
  )
}

export default JobList