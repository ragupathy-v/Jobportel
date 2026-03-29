import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstant from "../Axios/AxiosInstant";
import { formatDistanceToNow } from "date-fns";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";
import "../Styles/jobs.css";
import useUser from "../hooks/UseUser";

function Jobs() {
  const {user} = useUser()
  const [jobs, setJobs] = useState([])

  async function fetchJobs() {
    try {
      const res = await axiosInstant.get("company/jobs")
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  return (
    <div className="jb-page">
      <div className="jb-blob jb-blob--1" />
      <div className="jb-blob jb-blob--2" />

      <div className="jb-inner">

        {/* ── Header ── */}
        <header className="jb-header">
          <span className="jb-label">✦ Opportunities</span>
          <h1 className="jb-title">Latest <em>Job Listings</em></h1>
          <p className="jb-sub">
            <span className="jb-count">{jobs.length}</span> jobs found
          </p>
        </header>

        {/* ── Cards ── */}
        <div className="jb-list">
          {jobs.map((job, i) => (
            <Link
              to={user?.user_type === 'employee' ? `/job/${job.id}` : `/companies/review/${job.id}`}
              key={job.id}
              className="jb-card"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="jb-card-glow" />

              {/* top row: title + time */}
              <div className="jb-card-top">
                <div className="jb-card-titles">
                  <h3 className="jb-job-title">{job.title}</h3>
                  <span className="jb-company-name">{job.company?.name}</span>
                </div>
                <span className="jb-time">
                  {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                </span>
              </div>

              {/* chips row */}
              <div className="jb-chips">
                <span className="jb-chip">
                  <CiLocationOn />
                  {job.location}
                </span>
                <span className="jb-chip jb-chip--accent">
                  <RiMoneyRupeeCircleFill />
                  {job.salary_min} – {job.salary_max}
                </span>
                <span className="jb-chip">
                  <TfiBag />
                  {job.experience_min} – {job.experience_max} yrs
                </span>
              </div>

              {/* description */}
              <p className="jb-desc">{job.description}</p>

              {/* footer row */}
              <div className="jb-card-footer">
                <span className="jb-cta">View Details</span>
                <svg className="jb-arrow" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Jobs