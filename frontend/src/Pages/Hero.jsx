import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../Styles/Hero.css"
import axiosInstant from "../Axios/AxiosInstant"
import useUser from "../hooks/UseUser";

import { formatDistanceToNow } from "date-fns";
//react icons
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";
import { MdOutlineDescription } from "react-icons/md";
function Hero() {

  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const[jobs,setJobs]=useState([])
  const navigate = useNavigate()
  const user=useUser()


  // const tags = ["Software Engineer", "React Developer", "Python", "Remote"]

  const jobsapi= async()=>{
  try{
    const res= await axiosInstant.get('company/jobs/',{params:{location,title:query}})
   console.log(res.data)
   setJobs(res.data)
    ` `
  }
  catch(err){
    console.log(err)
  }
 }

  return (
    <section className="hero">
      <div className="hero-grid"></div>

      <div className="hero-content">

        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Find Top Jobs in India
        </div>

        <h1>
          Find Your <em>Dream Job</em><br />
          With Confidence
        </h1>

        <p className="hero-sub">
          Connect with top companies hiring right now. Your next career move is just one search away.
        </p>

        <div className="search-bar">

          <div className="search-field">
            <span className="search-field-icon">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill..."
            />
          </div>

          <div className="search-divider"></div>

          <div className="search-field">
            <span className="search-field-icon">📍</span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
            />
          </div>

          <button className="search-btn" onClick={jobsapi}>
            Search Jobs
          </button>

        </div>

        {/* <div className="search-tags">
          <span className="search-tag-label">Popular:</span>

          {tags.map((tag) => (
            <span
              key={tag}
              className="search-tag"
              onClick={() => setQuery(tag)}
            >
              {tag}
            </span>
          ))}

        </div> */}

      </div>
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
    </section>
  )
}

export default Hero