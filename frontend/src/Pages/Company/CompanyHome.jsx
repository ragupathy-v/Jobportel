import React, { useState, useEffect } from 'react'
import "../../Styles/CompanyHome.css"
import axiosInstant from '../../Axios/AxiosInstant'
import { Link } from 'react-router-dom'

// const stats = [
//   { label: 'Active Jobs', value: '12', icon: '💼', trend: '+3 this week' },
//   { label: 'Total Applicants', value: '284', icon: '👥', trend: '+47 this week' },
//   { label: 'Interviews Scheduled', value: '18', icon: '📅', trend: '+5 today' },
//   { label: 'Positions Filled', value: '7', icon: '✅', trend: 'This month' },
// ]

// const recentApplicants = [
//   { name: 'Priya Sharma', role: 'Senior Frontend Developer', time: '2 hrs ago', status: 'new', avatar: 'PS' },
//   { name: 'Arjun Mehta', role: 'Backend Engineer – Python', time: '5 hrs ago', status: 'reviewed', avatar: 'AM' },
//   { name: 'Sneha Reddy', role: 'Product Designer', time: '1 day ago', status: 'interview', avatar: 'SR' },
//   { name: 'Karthik Iyer', role: 'DevOps Engineer', time: '2 days ago', status: 'new', avatar: 'KI' },
// ]

// const activeJobs = [
//   { title: 'Senior Frontend Developer', applicants: 84, posted: '3 days ago', status: 'active' },
//   { title: 'Backend Engineer – Python', applicants: 61, posted: '1 week ago', status: 'active' },
//   { title: 'Product Designer', applicants: 39, posted: '5 days ago', status: 'active' },
//   { title: 'DevOps Engineer', applicants: 27, posted: '2 weeks ago', status: 'paused' },
// ]

// const statusColors = {
//   new: { bg: '#e0f2fe', text: '#0369a1', label: 'New' },
//   reviewed: { bg: '#fef9c3', text: '#854d0e', label: 'Reviewed' },
//   interview: { bg: '#dcfce7', text: '#166534', label: 'Interview' },
// }

export default function CompanyHome() {
  const [visible, setVisible] = useState(false)
  const[Company,setCompany]=useState({})
  async function companyfetch() {
        try{
        const res=await axiosInstant.get('company/companyregister/')
        console.log(res.data[0],'company')
      
        setCompany(res.data[0])
        }
        catch(err){
            console.log(err)
        }
        
    }

  useEffect(() => {
    companyfetch()
    setTimeout(() => setVisible(true), 80)
  }, [])

  return (
    <div className={`ch-root ${visible ? 'ch-visible' : ''}`}>
      {/* Ambient background blobs */}
      <div className="ch-blob ch-blob-1" />
      <div className="ch-blob ch-blob-2" />
      <div className="ch-blob ch-blob-3" />

      <div className="ch-container">

        {/* Hero greeting */}
        <div className="ch-hero">
          <div className="ch-hero-left">
            <span className="ch-eyebrow">
              <span className="ch-dot" /> Company Dashboard
            </span>
            <h1 className="ch-hero-title">
              Welcome back,<br />
              <span className="ch-brand">{Company?.name?Company?.name:''}</span>
            </h1>
            <p className="ch-hero-sub">
              Let's find your next great hire.
            </p>
            <div className="ch-hero-actions">
              <Link to='/jobpost' className="ch-btn-primary text-decoration-none">+ Post a New Job</Link>
              <Link to='/Job' className="ch-btn-ghost text-decoration-none">View All Applicants</Link>
            </div>
          </div>
          <div className="ch-hero-visual">
            <div className="ch-ring ch-ring-1" />
            <div className="ch-ring ch-ring-2" />
            <div className="ch-ring ch-ring-3" />
            <div className="ch-hero-icon">🏢</div>
          </div>
        </div>

        {/* Stats row */}
       {/*  <div className="ch-stats-grid">
          {stats.map((s, i) => (
            <div className="ch-stat-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="ch-stat-top">
                <span className="ch-stat-icon">{s.icon}</span>
                <span className="ch-stat-trend">{s.trend}</span>
              </div>
              <div className="ch-stat-value">{s.value}</div>
              <div className="ch-stat-label">{s.label}</div>
            </div>
          ))}
        </div>*/}

         {/* Active Jobs */}
        {/* Two column content */}
        {/*<div className="ch-grid-2col">

         
          <div className="ch-panel">
            <div className="ch-panel-header">
              <h2 className="ch-panel-title">Active Job Listings</h2>
              <button className="ch-link-btn">View all →</button>
            </div>
            <div className="ch-jobs-list">
              {activeJobs.map((job, i) => (
                <div className="ch-job-row" key={i}>
                  <div className="ch-job-row-info">
                    <span className="ch-job-row-title">{job.title}</span>
                    <span className="ch-job-row-meta">{job.applicants} applicants · {job.posted}</span>
                  </div>
                  <span className={`ch-job-badge ch-job-badge--${job.status}`}>
                    {job.status === 'active' ? '● Active' : '⏸ Paused'}
                  </span>
                </div>
              ))}
            </div>
          </div>*/}

          {/* Recent Applicants */}
          {/*
          <div className="ch-panel">
            <div className="ch-panel-header">
              <h2 className="ch-panel-title">Recent Applicants</h2>
              <button className="ch-link-btn">View all →</button>
            </div>
            <div className="ch-applicants-list">
              {recentApplicants.map((a, i) => (
                <div className="ch-applicant-row" key={i}>
                  <div className="ch-avatar">{a.avatar}</div>
                  <div className="ch-applicant-info">
                    <span className="ch-applicant-name">{a.name}</span>
                    <span className="ch-applicant-role">{a.role}</span>
                  </div>
                  <div className="ch-applicant-right">
                    <span
                      className="ch-status-pill"
                      style={{ background: statusColors[a.status].bg, color: statusColors[a.status].text }}
                    >
                      {statusColors[a.status].label}
                    </span>
                    <span className="ch-applicant-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>*/}

        {/* Quick action banner */}
        <div className="ch-cta-banner">
          <div className="ch-cta-text">
            <h3 className="ch-cta-title">Boost your hiring speed</h3>
            <p className="ch-cta-sub">Complete your company profile to attract 3× more qualified candidates.</p>
          </div>
          <button className="ch-btn-primary ch-btn-sm">Complete Profile →</button>
        </div>

      </div>
    </div>
  )
}