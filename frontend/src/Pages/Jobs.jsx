import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstant from "../Axios/AxiosInstant";
import { formatDistanceToNow } from "date-fns";
//react icons
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";
import { MdOutlineDescription } from "react-icons/md";

import "../Styles/Jobs.css";
import useUser from "../hooks/UseUser";

function Jobs() {
  const user=useUser()
  const [jobs, setJobs] = useState([]);
  //job fetching api
  async function fetchJobs() {
    try {
     
      const res = await axiosInstant.get("company/jobs");
      setJobs(res.data);
      console.log(res.data,'employee jobs');
   
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      <div className=" fulldev">
        {jobs.map((jobs) => (
          <Link
            to={user?.user_type=='employee'? `/job/${jobs.id}` : `/companies/review/${jobs.id}`}
            key={jobs.id}
            className=" outerdiv"
          >
            <div>
              <div>
              <h3 className="jobtitle">{jobs.title}</h3>
              <span className=" pb-1">{jobs.company?.name}</span>
              </div>
              <div className="list-div">
                <div className="item">
                  <CiLocationOn />
                  <span>{jobs.location}</span>
                </div>

                <div className="item">
                  <RiMoneyRupeeCircleFill />
                  <span>
                    {jobs.salary_min} - {jobs.salary_max}
                  </span>
                </div>

                <div className="item">
                  <TfiBag />
                  <span>
                    {jobs.experience_min} - {jobs.experience_max} yrs
                  </span>
                </div>
              </div>
              <div className="item">
                <MdOutlineDescription className="discription" />
              <p className=" text-truncate w-75">{jobs.description}</p>
              </div>
              <hr/>
              <p className="time">
                
                {formatDistanceToNow(new Date(jobs.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Jobs;
