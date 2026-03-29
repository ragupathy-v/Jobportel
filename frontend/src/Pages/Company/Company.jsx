import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../Styles/Company.css';
import axiosInstant from '../../Axios/AxiosInstant';

import { formatDistanceToNow } from "date-fns";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";
import { MdOutlineDescription } from "react-icons/md";
import useUser from '../../hooks/UseUser';

function Company() {
  const { id } = useParams()
  const {user} = useUser()
  const [activeTab, setActiveTab] = useState('jobs')
  const [company, setCompany] = useState({})
  const [jobs, setJobs] = useState([])

  async function companyfetch() {
    try {
      const res = await axiosInstant.get('company/company/', { params: { id } })
      setCompany(res.data[0])
    } catch (err) { console.log(err) }
  }

  const jobsapi = async () => {
    try {
      const res = await axiosInstant.get('company/jobs/', { params: { id } })
      setJobs(res.data)
    } catch (err) { console.log(err) }
  }

  useEffect(() => { companyfetch(); jobsapi() }, [])

  return (
    <div className="cd-wrapper">
      <div className="cd-tab-bar">
        <button
          className={`cd-tab-btn ${activeTab === 'overview' ? 'cd-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >Overview</button>
        <button
          className={`cd-tab-btn ${activeTab === 'jobs' ? 'cd-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >Jobs</button>
      </div>

      <div className="cd-content-area">
        {activeTab === 'overview' && (
          <div className="cd-overview-card">
            <h2 className="cd-overview-title">Company Details</h2>
            <div className="cd-overview-body">
              <div className="cd-info-row"><span className="cd-info-label">Name</span><span className="cd-info-value">{company.name}</span></div>
              <div className="cd-info-row"><span className="cd-info-label">About</span><span className="cd-info-value">{company.about}</span></div>
              <div className="cd-info-row"><span className="cd-info-label">Address</span><span className="cd-info-value">{company.address}</span></div>
              {company.website && (
                <div className="cd-info-row">
                  <span className="cd-info-label">Website</span>
                  <a href={company.website} target="_blank" rel="noreferrer" className="cd-info-link">{company.website}</a>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="cd-jobs-grid">
            {jobs.map((job) => (
              <Link
                to={user?.user_type === 'employee' ? `/job/${job.id}` : `/companies/review/${job.id}`}
                key={job.id}
                className="cd-job-card"
              >
                <div className="cd-job-header">
                  <h3 className="cd-job-title">{job.title}</h3>
                  <span className="cd-job-company">{job.company?.name}</span>
                </div>
                <div className="cd-job-meta">
                  <span className="cd-job-meta-item"><CiLocationOn className="cd-meta-icon" />{job.location}</span>
                  <span className="cd-job-meta-item"><RiMoneyRupeeCircleFill className="cd-meta-icon" />{job.salary_min} – {job.salary_max}</span>
                  <span className="cd-job-meta-item"><TfiBag className="cd-meta-icon" />{job.experience_min} – {job.experience_max} yrs</span>
                </div>
                <div className="cd-job-desc">
                  <MdOutlineDescription className="cd-desc-icon" />
                  <p className="cd-job-desc-text">{job.description}</p>
                </div>
                <div className="cd-job-footer">
                  <span className="cd-job-time">{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                  <span className="cd-job-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Company