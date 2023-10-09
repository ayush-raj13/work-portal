import { useEffect, useState } from "react";
import { useFetchJobApplicantsQuery } from "../store";
import JobApplicantCard from "./JobApplicantCard";
import Skeleton from "./Skeleton";

function JobApplicantList({ filter, resetJobApplicantList, setResetJobApplicantList, setFilter }) {
  const [jobApplicantList, setJobApplicantList] = useState([]);
  const { data, error, isFetching } = useFetchJobApplicantsQuery(filter);

  useEffect(() => {
    if (resetJobApplicantList) {
      setJobApplicantList([]);
      setResetJobApplicantList(false);
    }
  },[resetJobApplicantList, setResetJobApplicantList]);

  useEffect(() => {
    if (typeof data !== "undefined") {
      document.documentElement.scrollTop -= 205;
      setJobApplicantList((prev) => [...prev, ...data.jobApplicants]);
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

  const content = (jobApplicantList).map((jobApplicant) => {
    return <JobApplicantCard key={jobApplicant._id} jobApplicant={jobApplicant} />;
  });

  return (
    <div className="relative px-[25%] md:px-[10%] xl:px-[5%] -top-36 grid gap-x-10 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-screen min-h-fit bg-white">
      {content}
      {isFetching && <Skeleton className="h-80" times={10} />}
      {error && <div>Error loading Users.</div>}
    </div>
  );
}

export default JobApplicantList;